const {spotifyApi} = require('./getSpotifyApi.js');
const {scopes} = require('./shopifyAuthorisationScopes.js');

const state = 'some-state-of-my-choice'

const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
console.log(authorizeURL);
