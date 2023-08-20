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
import { artists as fusion2023 } from './data/fusion-artists';
import { artists as tarmac2022 } from './data/tarmac-2022';
import { artists as tomorrowland2023 } from './data/tomorrowland-2023';


const isAllowedOrigin = (requestOrigin: string) => {
    const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? "").split(',');
    return allowedOrigins.find((allowedOrigin => requestOrigin.includes(allowedOrigin)))
}

const setCors = (req: any, res: any) => {
    const requestOrigin = req.headers.origin ?? [];
    if (isAllowedOrigin(requestOrigin)) {
        res.setHeader('Access-Control-Allow-Origin', requestOrigin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

app.get('/authorizeURL', (req: any, res: any) => {
    setCors(req, res);
    const requestOrigin = req.headers.origin ?? "localhost:3000"; 
    if (isAllowedOrigin(requestOrigin)) {
        spotifyApi.setRedirectURI(requestOrigin)
    }
    const authorizeURL = spotifyApi.createAuthorizeURL(scopes, 'some-state-of-my-choice', true);  
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

type Something = Array<{id: string, name: string, artists: Array<{name: string, id: string}>, imageUrl?: string, albumName: string}>

function toRecord<T, K extends string | number | symbol>(
    array: T[],
    keyExtractor: (item: T) => K
  ): Record<K, T> {
    return array.reduce((record, item) => {
      const key = keyExtractor(item);
      record[key] = item;
      return record;
    }, {} as Record<K, T>);
  }

app.get('/playlists', async (req: any, res: any) => {
    setCors(req, res);
    const { query } = url.parse(req.url);
    const { accessToken, page } = querystring.parse(query);
    try {
        await spotifyApi.setAccessToken(accessToken);
        const userId = await getUserId()
        
        const playlists = await spotifyApi.getUserPlaylists({limit: 50, offset: page * 50})
        const processedPlaylists = playlists.body.items.map((playlist: SpotifyApi.PlaylistObjectSimplified) => {
            const image = playlist.images.reduce((smallest: any, image: any) => {
                if (image.height < smallest.height) return image
                return smallest
            }, playlist.images[0])
            return ({
                name: playlist.name,
                id: playlist.id,
                isOwn: playlist.owner.id === userId,
                trackAmount: playlist.tracks.total,
                snapShotId: playlist.snapshot_id,
                imageUrl: image?.url
            });
        })
        res.send(toRecord(processedPlaylists, (playlist) => playlist.id));
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
        console.log('/tracks', {playlistId, page})
        const getResponse = () => {
            if (playlistId === 'liked_songs') {
                return spotifyApi.getMySavedTracks({limit: 50, offset: page * 50})
            }
            return spotifyApi.getPlaylistTracks(playlistId,{limit: 50, offset: page * 50})
        }
        const response = await getResponse()
        const trackData: Something = response.body.items.map(({track}) => track).filter(track => track !== null).map(({id, name, artists, album}: any) => {
            const image = album.images.reduce((smallest: any, image: any) => {
                if (image.height < smallest.height) return image
                return smallest
            }, album.images[0])
            return {id, name, artists: artists.map(({name, id}: SpotifyApi.ArtistObjectSimplified) => ({name, id})), imageUrl: image?.url, albumName: album.name}
        })
        res.send(trackData);
        return
    } catch (err: any) {
        console.log(`Error when fetching playlist tracks. "${playlistId}"`)
        console.log(err)
        res.send('error')
        return
    }  
})

const timeStamp = () => {
    const date = new Date();
    const day = date.getDate().toString();
    const month = (date.getMonth() + 1).toString();
    const hour = date.getHours().toString();
    const minute = date.getMinutes().toString();
    return `${day}.${month}-${hour}:${minute}`
}

const createPlaylist = async (lineupName: string, key: string ) => {
    const name = `ArtistLookup - ${lineupName} [${key}]`
    const response_createPlaylist = await spotifyApi.createPlaylist(name, {public: false, description: `Playlist created by ArtistLookup at ${timeStamp()}`})
    const {id} = response_createPlaylist.body
    return id
}

app.post('/createPlaylist', async (req: any, res: any) => {
    setCors(req, res);
    const { query } = url.parse(req.url);
    const { accessToken, trackId, lineupName, playlistId, lineupKey} = querystring.parse(query);
    try {
        await spotifyApi.setAccessToken(accessToken);
        const id = playlistId ?? await createPlaylist(lineupName,lineupKey)
        const params = trackId.map((id: string) => `spotify:track:${id}`)
        await spotifyApi.replaceTracksInPlaylist(id, [])
        // I guess that not more than x tracks can be added to a playlist at once
        for (let i = 0; i < params.length; i += 50) {
            const paramsSlice = params.slice(i, i + 50)
            await spotifyApi.addTracksToPlaylist(id, paramsSlice)
        }
        res.send({playlistId: id});
        return
    } catch (err: any) {
        console.log("Error when creating playlist.")
        console.log(err)
        res.send({status: 'error'})
        return
    }
})

app.get('/lineups', async (req: any, res: any) => {
    setCors(req, res);
    res.send([fusion2023, tarmac2022, tomorrowland2023]);
    return
})


app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
}
);

module.exports = app;
