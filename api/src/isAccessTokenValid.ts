import {spotifyApi} from "./getSpotifyApi";
const url = require('url');
const querystring = require('querystring');

export const isAccessTokenValid = async (req: any, res: any) => {
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
}