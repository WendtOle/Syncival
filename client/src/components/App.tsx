import { Playlists } from "./Playlists"
import { ArtistResult } from "./ArtistResult"
import { ArtistInput } from "./ArtistInput"
import "./App.css"
import { BottomNavigation, BottomNavigationAction, Box, Paper } from "@mui/material"
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useRef, useState } from "react"

export const App = () => {
    const [value, setValue] = useState<'playlist'|'input'|'result'>('playlist');
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div className="App">
            <Box sx={{ pb: 7 }} ref={ref}>
                {value === 'playlist' && <Playlists />}
                {value === 'input' && <ArtistInput />}
                {value === 'result' && <ArtistResult />}
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        >
                        <BottomNavigationAction value="playlist" label="Playlists" icon={<RestoreIcon />} />
                        <BottomNavigationAction value="input" label="Input" icon={<FavoriteIcon />} />
                        <BottomNavigationAction value="result" label="Result" icon={<LocationOnIcon />} />
                    </BottomNavigation>
                </Paper>
            </Box>
            
        </div>
    )
}