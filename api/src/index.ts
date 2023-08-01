// setup simple express server
import { getTokens } from './authorizeApi';
import { scopes } from './shopifyAuthorisationScopes';

const express = require('express');
import {spotifyApi} from "./getSpotifyApi";
import { getUserId } from './getUserId';
const url = require('url');
const querystring = require('querystring');

const app = express();
const port  = process.env.PORT || 8888;
const authorizeURL = spotifyApi.createAuthorizeURL(scopes, 'some-state-of-my-choice', true);  
import { artists } from './data/fusion-artists';

const setCors = (req: any, res: any) => {
    const requestOrigin = req.headers.origin;
    const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? "").split(',');
    if (allowedOrigins.includes(requestOrigin)) {
        res.setHeader('Access-Control-Allow-Origin', requestOrigin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

app.get('/authorizeURL', (req: any, res: any) => {
    setCors(req, res);
    res.send(authorizeURL);
}
);

app.get('/authenticate', async (req: any, res: any) => {
    setCors(req, res);
    const { query } = url.parse(req.url);
    const { code } = querystring.parse(query);
    console.log(`code found: ${code}`);
    const {error, data} = await getTokens(code);
    if (data) {
        res.send(data);
        return
    }
    res.send(error);
})

app.get('/accessTokenValid', async (req: any, res: any) => {
    setCors(req, res);
    const { query } = url.parse(req.url);
    const { accessToken } = querystring.parse(query);
    spotifyApi.setAccessToken(accessToken);
    try {
        await spotifyApi.getMe();
        res.send('ok');
        return
    } catch (error: any) {
        if (error.body.error.message === "The access token expired") {
            res.send('expired');
            return
        }
        console.log({error})
        res.send('error');
        return
    }
})

app.get('/refresh', async (req: any, res: any) => {
    setCors(req, res);
    const { query } = url.parse(req.url);
    const { refreshToken } = querystring.parse(query);
    try {
        spotifyApi.setRefreshToken(refreshToken)
        const response = await spotifyApi.refreshAccessToken()
        res.send(response.body['access_token']);
        return
    } catch(error: any) {
        console.log(error)
        console.log('some error occured')
    }
    
})

type Something = Array<{id: string, name: string, artists: Array<{name: string, id: string}>}>

app.get('/playlists', async (req: any, res: any) => {
    setCors(req, res);
    const { query } = url.parse(req.url);
    const { accessToken, page } = querystring.parse(query);
    try {
        await spotifyApi.setAccessToken(accessToken);
        const userId = await getUserId()
        
        const playlists = await spotifyApi.getUserPlaylists({limit: 50, offset: page * 50})
        const processedPlaylists = playlists.body.items.map((playlist: SpotifyApi.PlaylistObjectSimplified) => ({
                name: playlist.name,
                id: playlist.id,
                isOwn: playlist.owner.id === userId,
                tracks: playlist.tracks.total
            }))
        res.send(processedPlaylists);
        return
    } catch (err: any) {
        console.log("Error when fetching playlists.")
        console.log(err.body.message)
        res.send('error')
        return
    }  
})

app.get('/tracks', async (req: any, res: any) => {
    setCors(req, res);
    const { query } = url.parse(req.url);
    const { accessToken, page, playlistId } = querystring.parse(query);
    try {
        await spotifyApi.setAccessToken(accessToken);
        console.log({playlistId, page})
        const getResponse = () => {
            if (playlistId === 'liked_songs') {
                return spotifyApi.getMySavedTracks({limit: 50, offset: page * 50})
            }
            return spotifyApi.getPlaylistTracks(playlistId,{limit: 50, offset: page * 50})
        }
        const response = await getResponse()
        console.log({response})
        const trackData: Something = response.body.items.map(({track}: any) => {
            const {id, name, artists} = track
            return {id, name, artists: artists.map(({name, id}: SpotifyApi.ArtistObjectSimplified) => ({name, id}))}
        })
        //console.log({trackData: trackData.length})
        res.send(trackData);
        return
    } catch (err: any) {
        console.log("Error when fetching playlists.")
        console.log(err.body.message)
        res.send('error')
        return
    }  
})

app.post('/createPlaylist', async (req: any, res: any) => {
    setCors(req, res);
    const { query } = url.parse(req.url);
    const { accessToken, trackId } = querystring.parse(query);
    try {
        const date = new Date();
        const day = date.getDate().toString();
        const month = (date.getMonth() + 1).toString();
        const hour = date.getHours().toString();
        const minute = date.getMinutes().toString();
        await spotifyApi.setAccessToken(accessToken);
        const name = "Fusion2023_YourArtists"
        const response_createPlaylist = await spotifyApi.createPlaylist(name, {public: false, description: `Playlist created by Fusion2023 at ${day}.${month}-${hour}:${minute}`})
        const {id} = response_createPlaylist.body
        const params = trackId.map((id: string) => `spotify:track:${id}`)
        await spotifyApi.addTracksToPlaylist(id, params)
        res.send({playlistId: id, name});
        return
    } catch (err: any) {
        console.log("Error when creating playlist.")
        console.log(err.body.message)
        res.send('error')
        return
    }
})

app.get('/data', async (req: any, res: any) => {
    setCors(req, res);
    res.send({fusion2023Artists: artists});
    return
})


app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
}
);

module.exports = app;
