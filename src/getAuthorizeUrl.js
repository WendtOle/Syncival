require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node');
//import scopes from './scopes.js'
const {scopes} = require('./scopes.js')
console.log({scopes})

const state = 'some-state-of-my-choice'

// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
var spotifyApi = new SpotifyWebApi({
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  clientId: process.env.SPOTIFY_CLIENT_ID
});

// Create the authorization URL
var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

console.log(authorizeURL);
