require('dotenv').config();
const fs = require('fs');
const {spotifyApi} = require('./getSpotifyApi.js');

const pathPrefix = `auth_${process.env.APPLICATION_USER}`

// check if code exists if not log that "npm run authorize" needs to be run first
if (!fs.existsSync(pathPrefix + '/code.txt')) {
    throw Error(`File ${pathPrefix}/code.txt does not exist.`);
}

const code = fs.readFileSync(`${pathPrefix}/code.txt`, 'utf8');

spotifyApi.authorizationCodeGrant(code).then(
    function(data) {
        console.log('The token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);
        console.log('The refresh token is ' + data.body['refresh_token']);
    
        fs.writeFile(pathPrefix + '/access_token.txt', data.body['access_token'],(err) => {
            if (err) throw err;
            console.log('Saved access_token!');
            })
        fs.writeFile(pathPrefix + '/refresh_token.txt', data.body['refresh_token'],(err) => {
            if (err) throw err;
            console.log('Saved refresh_token!');
            }) 
    },
    function(err) {
        console.log('Something went wrong!', err);
    }
);

