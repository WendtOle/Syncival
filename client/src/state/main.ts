import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { ArtistV2, Playlist, Track } from "./types";

export const LIKED_SONGS_PLAYLIST_ID = "liked_songs"
const likedSongsPlaylist: Playlist = {name: "Liked Songs", id: LIKED_SONGS_PLAYLIST_ID, isOwn: true}

export const playlistsAtom = atomWithStorage<Playlist[]>("playlists", [likedSongsPlaylist])
export const playlistSongsAtom = atomWithStorage<Record<string, Track[]>>("songs", {})
export const excludedPlaylistIdsAtom = atom<string[]>([])
export const filteredArtistsAtom = atom<ArtistV2[]>(get => {
    const filteredPlaylists = get(playlistsAtom).filter(({id}) => !get(excludedPlaylistIdsAtom).includes(id))
    const filteredTracks = filteredPlaylists.map(({id}) => (get(playlistSongsAtom)[id] ?? [])).flat()
    
    const artists = Object.values(filteredTracks.reduce<Record<string, ArtistV2>>( (prev, {artists, id, name}) => {
        artists.forEach(({id: artistId, name: artistName}) => {
            if (prev[artistId]) {
                if (!prev[artistId].tracks.find(track => track.id === id)){
                    prev[artistId].tracks.push({id, name, artists})
                }
            } else {
                prev[artistId] = {id: artistId, name: artistName, tracks: [{id, name, artists}]}
            }
        })
        return prev
    }, {}))

    const preprocessed = get(artistForComparisonAtom).map(artist => artist.toLowerCase())
    return artists.filter(({name}) => preprocessed.includes(name.toLocaleLowerCase()))
})
export const artistForComparisonAtom = atom<string[]>([])
export const focusedAtom = atom<{id: string, type: "artist" | "playlist"} | null>(null)

