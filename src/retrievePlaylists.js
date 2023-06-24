const {spotifyApi} =  require('./getSpotifyApi.js')
const {getUserId} = require('./getUserId.js');
require('dotenv').config();

const LIMIT = 50
const OFFSET_MULITPLIER = process.env.SPOTIFY_PLAYLIST_LIMIT;

const getPlaylists = async () => {
    const userId = await getUserId()

    const playlists = [];
    for (let i = 0; i < OFFSET_MULITPLIER; i++) {
        const data = await spotifyApi.getUserPlaylists({limit: LIMIT, offset: i * LIMIT});
        playlists.push(...data.body.items);
    }
    return playlists.filter(playlist => playlist.owner.id === userId);
}    

module.exports = { getPlaylists };