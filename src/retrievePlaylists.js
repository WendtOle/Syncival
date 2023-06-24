const {spotifyApi} =  require('./getSpotifyApi.js')
const {getUserId} = require('./getUserId.js');
require('dotenv').config();

const LIMIT = 50

const getPlaylists = async () => {
    const userId = await getUserId()

    const something = async (i, playlists) => {
        const data = await spotifyApi.getUserPlaylists({limit: LIMIT, offset: i * LIMIT});
        console.log(`spotifyApi.getUserPlaylists ${i}`)
        const currentPlaylists = data.body.items;
        playlists.push(...currentPlaylists);
        if (currentPlaylists.length === 0) {
            return playlists
        }
        return something(i + 1, playlists)
    }
    const playlists = await something(0, [])
    const uniquePlaylists =  playlists.filter(playlist => playlist.owner.id === userId);
    console.log(uniquePlaylists.length)
    return uniquePlaylists;
}    

module.exports = { getPlaylists };