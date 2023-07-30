import { useState } from "react"
import { Playlist } from "./SinglePlaylist"
import { excludedPlaylistIdsAtom, playlistSongsAtom, playlistsAtom } from "../state/main"
import { accessTokenAtom } from "../state/auth"
import { useAtom, useAtomValue } from "jotai"
import { getPlaylists } from "../provider/playlists"
import { getPlaylistTracks } from "../provider/songs"

export const Playlists = () => {
    const [playlists, setPlaylists] = useAtom(playlistsAtom)
    const [playlistSongs, setPlaylistSongs] = useAtom(playlistSongsAtom)
    const accessToken = useAtomValue(accessTokenAtom)
    const [foldedOutPlaylists, setFoldedOutPlaylists] = useState<string | undefined>()
    const [loadingPlaylist, setLoadingPlaylist] = useState<string | undefined>(undefined)
    const [showOnlySelected, setShowOnlySelected] = useState(false)
    const [excludedPlaylistId, setExcludedPlaylistId] = useAtom(excludedPlaylistIdsAtom)
    const filteredPlaylists = playlists.filter(({id}) => !showOnlySelected || !excludedPlaylistId.includes(id))

    const toggleVisibility = (id: string) => {
        if (foldedOutPlaylists === id) {
            setFoldedOutPlaylists(undefined)
            return
        } 
        setFoldedOutPlaylists(id)
    }

    const fetchAllPlaylists = async(nextPage = 0) => {
        const playlists = await getPlaylists(accessToken(), nextPage)
        if (playlists.length === 0) {
            return
        }
        setPlaylists((curPlaylists) => [...curPlaylists, ...playlists.filter(({id}) => !curPlaylists.some((playlist) => playlist.id === id))])
        await fetchAllPlaylists(nextPage + 1)
    }

    const fetchAllSongsOfAllPlaylists = async() => {
        const fetchAllSongs = async (playlistId: string,nextPage = 0) => {
            const songs = await getPlaylistTracks(accessToken(), nextPage, playlistId)
            if (songs.length === 0) {
                return 
            }
            setPlaylistSongs((playlistSongs) => {
                const songsToAdd = songs.filter(({id}) => !(playlistSongs[playlistId]?? []).some((song) => song.id === id))
                return ({ ...playlistSongs, [playlistId]: [...(playlistSongs[playlistId] ?? []), ...songsToAdd] })
            })
            await fetchAllSongs(playlistId,nextPage + 1)
        }

        for (let i = 0; i < playlists.length; ) {
            const playlist = playlists[i]
            setLoadingPlaylist(playlist.id)
            await fetchAllSongs(playlist.id)
            setLoadingPlaylist(undefined)
            i ++
        }
    }

    const toggleAll = () => {
        if (excludedPlaylistId.length === 0) {
            setExcludedPlaylistId(playlists.map(({id}) => id))
            return
        }
        setExcludedPlaylistId([])
    }

    const toggleForeign = () => {
        const foreignPlaylistsIds = playlists.filter(({isOwn}) => !isOwn).map(({id}) => id)
        if (foreignPlaylistsIds.every((id) => excludedPlaylistId.includes(id))) {
            setExcludedPlaylistId(cur => cur.filter(id => !foreignPlaylistsIds.includes(id)))
            return
        }
        setExcludedPlaylistId(cur => [...cur, ...foreignPlaylistsIds])
    }

    const sortedPlaylists = filteredPlaylists.sort((a,b) => {
        if (true) {
            return  (playlistSongs[b.id]?? []).length - (playlistSongs[a.id]?? []).length
        }
        return a.name.localeCompare(b.name)
    })

    return (
        <div>
            <div className="options">
                <button onClick={() => fetchAllPlaylists()}>Fetch all Playlists</button>
                <button onClick={fetchAllSongsOfAllPlaylists}>Fetch all tracks</button>
            </div>
            <div className="options">
                <button onClick={() => setShowOnlySelected(!showOnlySelected)} className={showOnlySelected ? "active" : ""} >Show only selected</button>
                <button onClick={toggleAll}>Toggle all</button>
                <button onClick={toggleForeign} >Toggle foreign playlists</button>
            </div>
            <div className="options">{filteredPlaylists.length} / {playlists.length} playlists</div>
            <div className="scroll-container">
                {sortedPlaylists.map((playlist) => {
                    const {id}  = playlist  
                    return (<div key={id} >
                        <Playlist fetching={id === loadingPlaylist} {...playlist} hideSongs={foldedOutPlaylists !== id} toggle={() => toggleVisibility(id)}/>
                    </div>)
                }
                )}
            </div>
        </div>
    )
}