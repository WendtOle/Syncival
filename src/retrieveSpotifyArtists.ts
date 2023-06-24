import { spotifyApi } from "./getSpotifyApi";
const { getPlayListNames } = require('./retrievePlaylists.ts');

type Track = {track: {artists: Array<{name: string}>}}

// get artists from my liked songs
const getArtistsFromLikedSongs = async () => {
    console.log("getArtistsFromLikedSongs")
    const data = await spotifyApi.getMySavedTracks();
    // log amount of liked songs
    console.log(`Found ${data.body.total} liked songs`);
    const artists = data.body.items.map((item: Track) => item.track.artists[0].name);
    // log amount of extracted artists
    console.log(`Found ${artists.length} not unique artists in liked songs.`);
    return artists;
}

/*
method which recursivly call paginated endpoint to retrieve all possible items
- limit should be 50
*/
const getAllItems = async <T>(i: number, items: Array<T>, endpoint: any): Promise<Array<T>> => {
    const data = await endpoint({limit: 50, offset: i * 50});
    const currentItems = data.body.items;
    items.push(...currentItems);
    if (currentItems.length === 0) {
        return items
    }
    return getAllItems(i + 1, items, endpoint)
}

// get artists from my playlists
const getArtistsFromPlaylists = async () => {
    console.log('getArtistsFromPlaylists')
    const playlists = await getPlayListNames();
    const artists = [];
    const metaInformation: Array<{playlist: string, artists: number, tracks: number}> = [];
    for (const playlist of playlists) {
        const items = await getAllItems<{track: {artists: Array<{name: string}>}}>(0, [], spotifyApi.getPlaylistTracks.bind(spotifyApi, playlist.id));

        const playlistArtists = items.map((item) => item.track?.artists.map(({name})=> name)).flat();
        artists.push(...playlistArtists);
        metaInformation.push({playlist: playlist.name, artists: playlistArtists.length, tracks: items.length});
    }
    // log amount of extracted artists
    console.log(`Found ${artists.length} artists not unique in playlists.`);
    console.log({metaInformation})
    return artists;
}    

export const getArtists = async () => {
    const likedSongsArtists = await getArtistsFromLikedSongs();
    const playlistArtists = await getArtistsFromPlaylists();
    const allArtists = [...likedSongsArtists, ...playlistArtists];
    return [...new Set(allArtists)];  
}

  

