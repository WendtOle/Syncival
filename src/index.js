// setup simple express server
const { authorizeApi } = require('./authorizeApi.js');
const express = require('express');
const { getArtists } = require('./retrieveSpotifyArtists.js');
const {spotifyApi} = require('./getSpotifyApi.js');
const {scopes} = require('./shopifyAuthorisationScopes.js');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 8888;

app.get('/', (req, res) => {
    const authorizeURL = spotifyApi.createAuthorizeURL(scopes, 'some-state-of-my-choice');  
    console.log(authorizeURL)
    res.redirect(authorizeURL);
}
);

app.get('/callback', async (req, res) => {
        const { query } = url.parse(req.url);
        const { code } = querystring.parse(query);
        console.log(`code found: ${code}`);
        const {error} = await authorizeApi(code);
        if (error) {
            res.send(error);
            return
        }
        console.log('authorized');
        const spotifyArtists = await getArtists();
        console.log(`Found ${spotifyArtists.length} artists`);
        const fusionArtists = JSON.parse(fs.readFileSync('./data/fusion-artists.json'));
        console.log(`Loaded ${fusionArtists.length} fusion artists`);
        console.log(spotifyArtists.filter(artist => fusionArtists.includes(artist)))
        // display array of strings as an html response
        res.send(spotifyArtists.filter(artist => fusionArtists.includes(artist)).join('<br>'));
    }
);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}
);
