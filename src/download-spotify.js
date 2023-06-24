const {spotifyApi} =  require('./getSpotifyApi.js')

// get artists from my liked songs
const getArtistsFromLikedSongs = async () => {
    const data = await spotifyApi.getMySavedTracks({ limit: 50 });
    console.log({data})
    const artists = data.body.items.map(item => item.track.artists[0]);
    return artists;
}

// get artists from my playlists
const getArtistsFromPlaylists = async () => {
    const accessToken = await getAccessToken();
    spotifyApi.setAccessToken(accessToken);
    const data = await spotifyApi.getUserPlaylists();
    const playlists = data.body.items;
    const artists = [];
    for (const playlist of playlists) {
        const data = await spotifyApi.getPlaylist(playlist.id);
        const playlistArtists = data.body.tracks.items.map(item => item.track.artists[0]);
        artists.push(...playlistArtists);
    }
    return artists;
}

const run = async () => {
    const likedSongsArtists = await getArtistsFromLikedSongs();
    console.log({likedSongsArtists})
}

run()