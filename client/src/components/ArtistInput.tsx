import { useRef, useState } from "react"
import { useAtom } from "jotai"
import { getData } from "../provider/data"
import { dataAtom } from "../state/data"
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, List, ListItemButton, ListItemIcon, ListItemText, TextField, Toolbar, Typography } from "@mui/material"
import LineupIcon from '@mui/icons-material/FormatListBulleted';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom"

export const ArtistInput = () => {
    const [text, setText] = useState("")
    const [data, setData] = useAtom(dataAtom)
    const [open, setOpen] = useState(false)
    const [lineupName, setLineupName] = useState("")
    const navigate = useNavigate()

    const parsedArtists = text.replace(/"/g,'').split(/,|\n/).map((artist: string) => artist.trim()).filter((artist: string) => artist.length > 0)

    const fetchData = async () => {
        const fetchedData = await getData();
        setData(fetchedData);
    }


    const addLineUp = () => {
        setData(cur => ({...cur, [lineupName]: parsedArtists}))
        setLineupName("")
        setOpen(false)
    }

    const clear = () => {
        setText("")
    }

    return (
        <div>
            <AppBar position="sticky"> 
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>Lineup</Typography>
                    <Button variant="outlined" color="inherit" onClick={() => setOpen(cur => !cur)}>Add lineup</Button>
                </Toolbar>
            </AppBar>
            <List>
                {Object.entries(data).map(([key, value]) => (
                    <ListItemButton key={key} onClick={() => navigate("/lineup/" + key)}>
                        <ListItemIcon><LineupIcon /></ListItemIcon>
                        <ListItemText primary={key} secondary={`${value.length} artists`} />
                    </ListItemButton>
                ))}
            </List>    
            
            <Dialog open={open}>
                <DialogTitle>Create Lineup manually</DialogTitle>
                <DialogContent>
                    <TextField size="small" id="outlined-basic" label="Name" variant="outlined" value={lineupName} onChange={(event) => setLineupName(event.target.value)} />
                    <div className="options">{parsedArtists.length} artists found</div>
                    <List>
                        {parsedArtists.map((artist: string, index) => (
                            <div className="artist" key={index}>{artist}</div>
                        ))}
                    </List>
                    <label>
                        Enter your artists here:
                        <textarea rows={6} style={{width: "100%"}} placeholder="Enter your artists here ..." value={text} onChange={(event) => setText(event.target.value)}/>
                    </label>
                </DialogContent>
                <DialogActions>
                    <Button onClick={clear}>Clear</Button>
                    <Button onClick={addLineUp}>Apply</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}