import { useState } from "react"
import { Playlist } from "./SinglePlaylist"
import { excludedPlaylistIdsAtom, playlistSongsAtom, playlistsAtom } from "../state/main"
import { accessTokenAtom } from "../state/auth"
import { useAtom, useAtomValue } from "jotai"
import { getPlaylists } from "../provider/playlists"
import { getPlaylistTracks } from "../provider/songs"
import { AppBar, Box, Fab, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Paper, Toolbar, Typography } from "@mui/material"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link, useNavigate } from "react-router-dom"
import { Favorite, Title } from "@mui/icons-material"
import PlaylistIcon from '@mui/icons-material/Folder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FollowedPlaylistIcon from '@mui/icons-material/Public';
import { PlaylistItem } from "./PlaylistItem"


export const Playlists = () => {
    const navigate = useNavigate()
    const [playlists, setPlaylists] = useAtom(playlistsAtom)
    const [playlistSongs, setPlaylistSongs] = useAtom(playlistSongsAtom)
    const accessToken = useAtomValue(accessTokenAtom)
    const [foldedOutPlaylists, setFoldedOutPlaylists] = useState<string | undefined>()
    const [loadingPlaylist, setLoadingPlaylist] = useState<string | undefined>(undefined)
    const [showOnlySelected, setShowOnlySelected] = useState(false)
    const [excludedPlaylistId, setExcludedPlaylistId] = useAtom(excludedPlaylistIdsAtom)
    const filteredPlaylists = playlists.filter(({id}) => !showOnlySelected || !excludedPlaylistId.includes(id))

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

    /*
    <div className="options">
                <button onClick={() => fetchAllPlaylists()}>Fetch all Playlists</button>
                <button onClick={fetchAllSongsOfAllPlaylists}>Fetch all tracks</button>
            </div>
            <div className="options">
                <button onClick={() => setShowOnlySelected(!showOnlySelected)} className={showOnlySelected ? "active" : ""} >Show only selected</button>
                <button onClick={toggleAll}>Toggle all</button>
                <button onClick={toggleForeign} >Toggle foreign playlists</button>
            </div>
            */

    const toggle = (id: string) => {
        setExcludedPlaylistId(cur => {
            if (cur.includes(id)) {
                return cur.filter((curId) => curId !== id)
            }
            return [...cur, id]
        })
    }

    return (
        <div>
            
            <AppBar position="sticky"> 
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>Your playlists</Typography>
                </Toolbar>
            </AppBar>
            <List dense>
                {sortedPlaylists.map(({id}) => <PlaylistItem key={id} id={id} /> )}
            </List>
        </div>
    )
}