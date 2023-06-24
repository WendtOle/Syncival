// setup simple express server
const { authorizeApi } = require('./authorizeApi.ts');
const express = require('express');
const { getArtists } = require('./retrieveSpotifyArtists.ts');
import {spotifyApi} from "./getSpotifyApi";
const {scopes} = require('./shopifyAuthorisationScopes.ts');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');

const app = express();
const port  = process.env.PORT || 8888;
const authorizeURL = spotifyApi.createAuthorizeURL(scopes, 'some-state-of-my-choice', true);  


app.get('/', (req: any, res: any) => {
    console.log(authorizeURL)
    res.redirect(authorizeURL);
}
);

app.get('/callback', async (req: any, res: any) => {
        const { query } = url.parse(req.url);
        const { code } = querystring.parse(query);
        console.log(`code found: ${code}`);
        const {error} = await authorizeApi(code);
        if (error) {
            res.send(error);
            return
        }
        console.log('authorized');
        const spotifyArtists = (await getArtists()).map((artist: string) => artist.toLowerCase());
        console.log(`Spotify artists: ${spotifyArtists.length}`);
        const fusionArtists = JSON.parse(fs.readFileSync('./data/fusion-artists.json'));
        console.log(`Fusion Artists: ${fusionArtists.length}`);
        const overlappingArtists = fusionArtists.filter((artist: string) => spotifyArtists.includes(artist.toLowerCase()))
        console.log(`Overlapping: ${overlappingArtists.length}`)
        res.send(overlappingArtists.sort().join('<br>'));
    }
);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    console.log(`for manual: ${authorizeURL}`)
}
);
