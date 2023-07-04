import { spotifyApi } from "./getSpotifyApi";
import { getAllItems } from "./utils";
const { getPlayListNames } = require('./retrievePlaylists.ts');

type Track = {track: {artists: Array<{name: string}>}}

const getArtistsFromLikedSongs = async () => {
    console.log("getArtistsFromLikedSongs")

    try {
        const data = await getAllItems(0, [], spotifyApi.getMySavedTracks.bind(spotifyApi));
        console.log(`Found ${data.length} liked songs`);
        const artists = data.map(({track}: Track) => track.artists[0].name);
        console.log(`Found ${artists.length} not unique artists in liked songs.`);
        return artists;
    } catch(e) {
        console.log("Error when fetching liked songs.")
    } finally {
        return []
    }
}

// get artists from my playlists
const getArtistsFromPlaylists = async () => {
    const playlists = await getPlayListNames();
    const artists = [];
    const metaInformation: Array<{playlist: string, artists: number, tracks: number}> = [];
    for (const playlist of playlists) {
        try{
        const items = await getAllItems<{track: {artists: Array<{name: string}>}}>(0, [], spotifyApi.getPlaylistTracks.bind(spotifyApi, playlist.id));

        const playlistArtists = items.map((item) => item.track?.artists.map(({name})=> name)).flat();
        artists.push(...playlistArtists);
        const info = {playlist: playlist.name, artists: playlistArtists.length, tracks: items.length}
        metaInformation.push(info);
        } catch (err: any) {
            console.log(`Error "${err.body.error.message}" when retrieving Playlist "${playlist.name}" with id "${playlist.id}"`)
        }
    }
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

  

