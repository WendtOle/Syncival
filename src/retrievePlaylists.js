/*
save all artists from liked songs and all own playlists to spotify-artists.json
- use getSpotifyApi.js to get spotifyApi object
- save only unique artists
- save only the name of the artist as a string

*/
const {spotifyApi} =  require('./getSpotifyApi.js')
const {getUserId} = require('./getUserId.js');
require('dotenv').config();

const LIMIT = 50
const OFFSET_MULITPLIER = proccess.env.SPOTIFY_PLAYLIST_LIMIT;

const getPlaylists = async () => {
    const userId = await getUserId()

    const playlists = [];
    for (let i = 0; i < OFFSET_MULITPLIER; i++) {
        const data = await spotifyApi.getUserPlaylists({limit: LIMIT, offset: i * LIMIT});
        playlists.push(...data.body.items);
    }
    return playlists.filter(playlist => playlist.owner.id === userId);
}    

const run = async () => {
    const playlist = await getPlaylists();
    console.log({playlist: playlist.map(({name}) => name), length: playlist.length})
}

run()

module.exports = { getPlaylists };