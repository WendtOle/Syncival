import { Playlists } from "./Playlists"
import { ArtistResult } from "./ArtistResult"
import { ArtistInput } from "./ArtistInput"
import "./App.css"
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material"
import { Route, Routes, useLocation, useNavigate, useNavigation } from "react-router-dom"
import { Playlist } from "./SinglePlaylistV2"
import { Lineup } from "./Lineup"
import { ArtistNavigationIcon } from "./ArtistNavigationIcon"
import { PlaylistNavigationIcon } from "./PlaylistNavigationIcon"
import { LineupNavigationIcon } from "./LineupNavigationIcon"
import { DataLoading } from "./DataLoading"

export enum RouteEnum {
    ARTISTS = "/artists",
    PLAYLIST_LIST = "/playlists",
    LINEUP_LIST = "/setup",
    LOADING = "/",
    PLAYLIST = "/playlist/:id",
    LINEUP = "/lineup/:id"
}

const borderBottomItems = [
    {route: RouteEnum.ARTISTS, icon: <ArtistNavigationIcon />, label: "Artists"}, 
    {route: RouteEnum.PLAYLIST_LIST, icon: <PlaylistNavigationIcon />, label: "Playlists"}, 
    {route: RouteEnum.LINEUP_LIST, icon: <LineupNavigationIcon />, label: "Lineup"}]

export const App = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const showBottomNav = location.pathname !== RouteEnum.LOADING

    const getItem = ({route, icon, label}: {route: RouteEnum, icon: any, label: string}) => {
        const active = location.pathname === route
        return (<BottomNavigationAction key={route} sx={{background: active ? "whitesmoke" : ""}} onClick={() => navigate(route)} label={label} icon={icon} />)

    }

        return (
        <>
            <Routes>
                <Route path={RouteEnum.LOADING} element={<DataLoading />} />
                <Route path={RouteEnum.LINEUP_LIST} element={<ArtistInput />}/>
                <Route path={RouteEnum.LINEUP} element={<Lineup />}/>
                <Route path={RouteEnum.PLAYLIST_LIST} element={<Playlists />} />
                <Route path={RouteEnum.PLAYLIST} element={<Playlist />} />
                <Route path={RouteEnum.ARTISTS} element={<ArtistResult />} />
            </Routes>

            {showBottomNav && <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation showLabels>
                    {borderBottomItems.map(getItem)}
                </BottomNavigation>
            </Paper>}
        </>
    )
}