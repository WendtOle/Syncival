// setup simple express server
import { getTokens } from './authorizeApi';

const express = require('express');
import {spotifyApi} from "./getSpotifyApi";
import { getUserId } from './getUserId';
const {scopes} = require('./shopifyAuthorisationScopes.ts');
const url = require('url');
const querystring = require('querystring');

const app = express();
const port  = process.env.PORT || 8888;
const authorizeURL = spotifyApi.createAuthorizeURL(scopes, 'some-state-of-my-choice', true);  
import fs = require('fs');

app.use((req: any, res: any, next: any) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
  });

app.get('/', (req: any, res: any) => {
res.redirect(authorizeURL);
}
);

app.get('/authorizeURL', (req: any, res: any) => {
    res.send(authorizeURL);
}
);

app.get('/authenticate', async (req: any, res: any) => {
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

app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
}
);
