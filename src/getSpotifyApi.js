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

// create folder auth_${process.env.APPLICATION_USER} if it doesn't exist
if (!fs.existsSync(`auth_${process.env.APPLICATION_USER}`)) {
    console.log(`Folder auth_${process.env.APPLICATION_USER} does not exist. It will be created.`);
    fs.mkdirSync(`auth_${process.env.APPLICATION_USER}`);
}

// read and set access and refresh tokens from file if it exists
if (fs.existsSync(`auth_${process.env.APPLICATION_USER}/access_token.txt`)) {
    const access_token = fs.readFileSync(`auth_${process.env.APPLICATION_USER}/access_token.txt`, 'utf8');
    spotifyApi.setAccessToken(access_token);
}

//do the same for refresh token
if (fs.existsSync(`auth_${process.env.APPLICATION_USER}/refresh_token.txt`)) {
    const refresh_token = fs.readFileSync(`auth_${process.env.APPLICATION_USER}/refresh_token.txt`, 'utf8');
    spotifyApi.setRefreshToken(refresh_token);
}

module.exports = { spotifyApi };