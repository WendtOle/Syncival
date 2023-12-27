import { Box, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { useLineups } from "../../hooks/useLineups";
import { CheckIcon } from "../Icons";
import { useNavigate } from "react-router-dom";
import { RouteEnum } from "../../state/types";

export const LinupSelectionScreen = () => {
    const { lineups, select } = useLineups();
    const navigate = useNavigate()
    return(<Box sx={{backgroundColor: "#fff9c4", width: "100%", height: "100vh", display: "flex", flexDirection: "column", textAlign: "center" }}>
        <Typography variant="h2">Synceval</Typography>
        <Typography variant="body1" sx={{marginTop: 5}}>Find those Spotify artists and songs which are hidden behind forgettable names in your Spotify library and in mind crushing festival lineups!</Typography>
        
        <Box sx={{marginLeft: 4, marginRight: 4, textAlign: "start", marginBottom: 10, marginTop: 8}}>
        <Typography variant="h6">Lineup Selection</Typography>
            <List sx={{background: "white"}}>
                {lineups.map(({ key, name, selected }) => {
                return (
                <ListItemButton
                    key={key}
                    onClick={() => {
                    select(key);
                    }}
                    selected={selected}
                >
                    {selected && (
                    <ListItemIcon>
                        <CheckIcon />
                    </ListItemIcon>
                    )}
                    <ListItemText inset={!selected} primary={name}/>
                </ListItemButton>
                );
            })}
            </List>
        </Box>
            
        
        <Button sx={{marginBottom: 1, marginLeft: 2, marginRight: 2}} color="inherit" variant="outlined" >Connect your Spotify library</Button>
        <Button sx={{marginBottom: 1, marginLeft: 2, marginRight: 2}} color="inherit" variant="outlined" onClick={() => navigate(RouteEnum.ARTISTS)}>Compare lineup with Spotify library</Button>
    </Box>)
}