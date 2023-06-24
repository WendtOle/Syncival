const {spotifyApi} =  require('./getSpotifyApi.ts')
const fs = require('fs');

spotifyApi.refreshAccessToken().then(
    function(data) {
      console.log('The access token has been refreshed!');
  
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);

      fs.writeFile('access_token.txt', data.body['access_token'],(err) => {
        if (err) throw err;
        console.log('Saved access_token!');
        })
    },
    function(err) {
      console.log('Could not refresh access token', err);
    }
  );