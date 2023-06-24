const {spotifyApi} =  require('./getSpotifyApi.js')
const { getPlaylists } = require('./retrievePlaylists.js');

// get artists from my liked songs
const getArtistsFromLikedSongs = async () => {
    console.log("getArtistsFromLikedSongs")
    const data = await spotifyApi.getMySavedTracks();
    // log amount of liked songs
    console.log(`Found ${data.body.total} liked songs`);
    const artists = data.body.items.map(item => item.track.artists[0].name);
    // log amount of extracted artists
    console.log(`Found ${artists.length} not unique artists in liked songs.`);
    return artists;
}

// get artists from my playlists
const getArtistsFromPlaylists = async () => {
    console.log('getArtistsFromPlaylists')
    const playlists = await getPlaylists();
    const artists = [];
    for (const playlist of playlists) {
        const data = await spotifyApi.getPlaylist(playlist.id);
        const playlistArtists = data.body.tracks.items.map(item => item.track.artists[0].name);
        artists.push(...playlistArtists);
    }
    // log amount of extracted artists
    console.log(`Found ${artists.length} artists not unique in playlists.`);
    return artists;
}    

const getArtists = async () => {
    const likedSongsArtists = await getArtistsFromLikedSongs();
    const playlistArtists = await getArtistsFromPlaylists();
    const allArtists = [...likedSongsArtists, ...playlistArtists];
    return [...new Set(allArtists)];  
}

module.exports = { getArtists };
  

