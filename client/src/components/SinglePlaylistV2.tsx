import { ArtistV2, Playlist as PlaylistType, Track } from "../state/types"
import "./Playlist.css"
import { atom, useAtom, useAtomValue } from "jotai"
import { playlistSongsAtom, playlistsAtom } from "../state/main"
import { useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AppBar, Button, ButtonGroup, CircularProgress, Collapse, Fab, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import SongIcon from '@mui/icons-material/Audiotrack';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PersonIcon from '@mui/icons-material/Person';
import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { extractArtists } from "../util/extractArtists"
import { SongItem } from "./SongItem"
import { ArtistItem } from "./ArtistItem"

export const Playlist = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    if (!id) {
        throw new Error("No id provided")
    }
    const playList = useAtomValue(useMemo(() => atom((get) => get(playlistsAtom).find(({id: cur}) => cur === id)), [id]))
    const [songs] = useAtom(useMemo(() => atom((get) => get(playlistSongsAtom)[id] ?? []),[id]))
    const [groupBy, setGroupBy] = useState<"artist"|"songs">("songs")
    const [expandedArtist, setExpandedArtist] = useState<string | undefined>(undefined)

    if (!playList) {
        return <CircularProgress />
    }

    const {name} = playList

    const uniqueSongs = songs.reduce((acc, nextSong) => acc.find(({id: curId}) => curId === nextSong.id) ? acc : [...acc, nextSong], [] as Track[])
    const uniqueArtists = extractArtists(uniqueSongs)

    return (
        <div key={id} >
            <AppBar position="sticky"> 
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => navigate("/playlists")}
                    >
                        <ArrowBackIosIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>Playlist: "{name}"</Typography>
                    <Button variant="outlined" color="inherit" onClick={() => window.open(`spotify:playlist:${id}`, '_blank')}>Open</Button>
                </Toolbar>
                
            </AppBar>
                <List dense component="nav">
                    {groupBy === "songs" ? uniqueSongs.map(song => <SongItem key={song.id} {...song} />) : uniqueArtists.map((artist) => {
                        return <ArtistItem key={artist.id} {...artist} expandedArtist={expandedArtist} setExpandedArtist={setExpandedArtist} markWhenInLineUp/>
                    })}
                </List>
            <Fab sx={{position: "fixed", bottom: 72, right: 16}} color="info" onClick={() => setGroupBy(cur => cur === "songs" ? "artist" : "songs")}>
                {groupBy === "songs" ? <PersonIcon /> : <SongIcon />}
            </Fab>
        </div>
    )
}