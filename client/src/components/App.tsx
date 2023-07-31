import { Playlists } from "./Playlists"
import { ArtistResult } from "./ArtistResult"
import { ArtistInput } from "./ArtistInput"
import "./App.css"
import { Badge, BottomNavigation, BottomNavigationAction, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, Paper } from "@mui/material"
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useRef, useState } from "react"
import { Route, Routes, useNavigate, useParams } from "react-router-dom"
import { Playlist } from "./SinglePlaylistV2"
import { Lineup } from "./Lineup"
import PersonIcon from '@mui/icons-material/Person'
import PlaylistIcon from '@mui/icons-material/Folder';
import LineupIcon from '@mui/icons-material/FormatListBulleted';
import { ArtistNavigationIcon } from "./ArtistNavigationIcon"
import { PlaylistNavigationIcon } from "./PlaylistNavigationIcon"
import { LineupNavigationIcon } from "./LineupNavigationIcon"


export const App = () => {
    const navigate = useNavigate()

    return (
        <>
            <Routes>
                <Route path="/setup" element={<ArtistInput />}/>
                <Route path="/lineup/:id" element={<Lineup />}/>
                <Route path="/playlists" element={<Playlists />} />
                <Route path="/playlist/:id" element={<Playlist />} />
                <Route path="/artists" element={<ArtistResult />} />
            </Routes>

            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation showLabels>
                    <BottomNavigationAction onClick={() => navigate("/artists")} label="Artists" icon={<ArtistNavigationIcon />} />
                    <BottomNavigationAction onClick={() => navigate("/playlists")} label="Playlists" icon={<PlaylistNavigationIcon />} />
                    <BottomNavigationAction onClick={() => navigate("/setup")} label="Lineup" icon={<LineupNavigationIcon />} />
                </BottomNavigation>
            </Paper>
            
        </>
    )
}