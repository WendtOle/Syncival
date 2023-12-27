import { isAllowedOrigin } from "./isAllowedOrigin";
import { scopes } from './shopifyAuthorisationScopes';
import {spotifyApi} from "./getSpotifyApi";

export const authorizeURL = (req: any, res: any) => {
    const requestOrigin = req.headers.origin ?? "localhost:3000"; 
    if (isAllowedOrigin(requestOrigin)) {
        spotifyApi.setRedirectURI(requestOrigin)
    }
    const authorizeURL = spotifyApi.createAuthorizeURL(scopes, 'some-state-of-my-choice', true);  
    res.send(authorizeURL);
}