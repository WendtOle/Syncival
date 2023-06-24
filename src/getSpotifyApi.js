// initialize spotify api
require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node');
const fs = require('fs');

// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

const access_token = fs.readFileSync('access_token.txt', 'utf8');
const refresh_token = fs.readFileSync('refresh_token.txt', 'utf8');

spotifyApi.setAccessToken(access_token);
spotifyApi.setRefreshToken(refresh_token);

module.exports = { spotifyApi };