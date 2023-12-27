
import {spotifyApi} from "./getSpotifyApi";
const url = require('url');
const querystring = require('querystring');

export const refresh = async (req: any, res: any) => {
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
    
}