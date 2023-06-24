/*
save all artists from liked songs and all own playlists to spotify-artists.json
- use getSpotifyApi.js to get spotifyApi object
- save only unique artists
- save only the name of the artist as a string

*/
const {spotifyApi} =  require('./getSpotifyApi.js')
const fs = require('fs');
const { getPlaylists } = require('./retrievePlaylists.js');

// get artists from my liked songs
const getArtistsFromLikedSongs = async () => {
    const data = await spotifyApi.getMySavedTracks();
    // log amount of liked songs
    console.log(`Found ${data.body.total} liked songs`);
    const artists = data.body.items.map(item => item.track.artists[0].name);
    // log amount of extracted artists
    console.log(`Found ${artists.length} artists (not unique)`);
    return artists;
}

// get artists from my playlists
const getArtistsFromPlaylists = async () => {
    const playlists = await getPlaylists();
    const artists = [];
    for (const playlist of playlists) {
        const data = await spotifyApi.getPlaylist(playlist.id);
        const playlistArtists = data.body.tracks.items.map(item => item.track.artists[0].name);
        artists.push(...playlistArtists);
    }
    // log amount of extracted artists
    console.log(`Found ${artists.length} artists (not unique)`);
    return artists;
}    

const run = async () => {
    const likedSongsArtists = await getArtistsFromLikedSongs();
    const playlistArtists = await getArtistsFromPlaylists();
    const allArtists = [...likedSongsArtists, ...playlistArtists];
    const uniqueArtists = [...new Set(allArtists)];
    fs.writeFileSync('spotify-artists.json', JSON.stringify(uniqueArtists));
    console.log(`Saved ${uniqueArtists.length} artists to spotify-artists.json`);
}

run()

  

