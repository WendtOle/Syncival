import { spotifyApi } from "./getSpotifyApi";

require('dotenv').config();

export const getTokens = async (code: string): Promise<{data?: {accessToken: string, refreshToken: string}, error?: string}> => {
    try {
        const data = await spotifyApi.authorizationCodeGrant(code)
        
        console.log('The token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);
        console.log('The refresh token is ' + data.body['refresh_token']);
    
        return {data: { 
            accessToken: data.body['access_token'], 
            refreshToken: data.body['refresh_token']
        }}
        } catch (err: any) {
            console.log({body: err.body})
            return {error: err.body.error_description}
        }
}
