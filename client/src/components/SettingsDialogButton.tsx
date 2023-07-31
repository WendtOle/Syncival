import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material"
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RouteEnum } from "./App";

export const SettingsDialogButton = () => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    
    return (<>
        <IconButton color="inherit" onClick={() => setOpen(cur => !cur)}>
            <SettingsIcon />
        </IconButton>
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Settings</DialogTitle>
            <DialogContent>
                <Button variant="outlined" onClick={() => navigate(RouteEnum.LOADING)}>Go to load data page</Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Close</Button>
            </DialogActions>
        </Dialog>
    </>)
}