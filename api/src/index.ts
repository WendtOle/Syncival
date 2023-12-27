// setup simple express server
import { getTokens } from './authorizeApi';

const express = require('express');
import {spotifyApi} from "./getSpotifyApi";
import { getUserId } from './getUserId';
const url = require('url');
const querystring = require('querystring');

const app = express();
const port  = process.env.PORT || 8888;
import { authorizeURL } from './authorizeURL';
import { setCors } from './setCors';
import { createPlaylist } from './createPlaylist';
import { sendLineups } from './sendLineups';
import { sendTracks } from './sendTracks';
import { toRecord } from './toRecord';

app.use((req: any, res: any, next: any) => {
    setCors(req, res);
    next();
});

app.get('/authorizeURL', authorizeURL);

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

app.get('/playlists', async (req: any, res: any) => {
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

app.get('/tracks', sendTracks)
app.post('/createPlaylist', createPlaylist)
app.get('/lineups', sendLineups)


app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
}
);

module.exports = app;
