import { ArtistV2, Playlist as PlaylistType, Track } from "../state/types"
import "./Playlist.css"
import { atom, useAtom, useAtomValue } from "jotai"
import { filteredArtistsAtom, playlistSongsAtom, playlistsAtom } from "../state/main"
import { useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AppBar, Button, ButtonGroup, CircularProgress, Collapse, Divider, Fab, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemSecondaryAction, ListItemText, Toolbar, Typography } from "@mui/material"
import SongIcon from '@mui/icons-material/Audiotrack';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PersonIcon from '@mui/icons-material/Person';
import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { extractArtists } from "../util/extractArtists"
import { SongItem } from "./SongItem"
import LaunchIcon from '@mui/icons-material/Launch';


export const ArtistItem = ({ id, name, tracks, expandedArtist, setExpandedArtist, markWhenInLineUp}: ArtistV2 & {expandedArtist?: string, setExpandedArtist: (id?: string) => void, markWhenInLineUp?: boolean}) => {
    const filteredArtists = useAtomValue(filteredArtistsAtom)
    const expanded = expandedArtist === id

    const containedInLineup = filteredArtists.find(({id: curId}) => curId === id)

    return (<div key={id} style={{background: containedInLineup && markWhenInLineUp ? "#bffde6" : ""}}>
        <ListItemButton onClick={() => setExpandedArtist(expanded ? undefined : id)}>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary={name} secondary={`${tracks.length} songs`} />
            <ListItemSecondaryAction>
                                <LaunchIcon onClick={() => window.open(`spotify:artist:${id}`, '_blank')} sx={{marginRight: 1}} />
                                {expanded ? <ExpandLess /> : <ExpandMore />}
                            </ListItemSecondaryAction>
            
            
        </ListItemButton>  
        {expanded && <Divider />}
        <Collapse in={expanded}>
            <List dense disablePadding>
                {tracks.map(({name, id, artists}) => {
                    return (
                        <ListItem key={id} sx={{pl: 4}}>
                            <ListItemIcon><SongIcon /></ListItemIcon>
                            <ListItemText primary={name} secondary={artists.map(({ name }) => name).join(', ')} />
                            <ListItemSecondaryAction>
                                <LaunchIcon onClick={() => window.open(`spotify:track:${id}`, '_blank')} sx={{marginRight: 4}}/>
                            </ListItemSecondaryAction>
                            </ListItem>
                    )
                })}
            </List>
        </Collapse> 
        {expanded && <Divider />}
    </div>)
}