require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node');

// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
var spotifyApi = new SpotifyWebApi({
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

// load 'code' from file 'code.txt'
const fs = require('fs');
const code = fs.readFileSync('code.txt', 'utf8');


spotifyApi.authorizationCodeGrant(code).then(
    function(data) {
        console.log('The token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);
        console.log('The refresh token is ' + data.body['refresh_token']);
    
        fs.writeFile('access_token.txt', data.body['access_token'],(err) => {
            if (err) throw err;
            console.log('Saved access_token!');
            })
        fs.writeFile('refresh_token.txt', data.body['refresh_token'],(err) => {
            if (err) throw err;
            console.log('Saved refresh_token!');
            }) 

        // Set the access token on the API object to use it in later calls
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);
    },
    function(err) {
        console.log('Something went wrong!', err);
    }
);

