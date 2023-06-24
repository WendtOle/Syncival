// initialize spotify api
require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node');

// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
export const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

console.log("getSpotifyApi.js: spotifyApi initialized")

