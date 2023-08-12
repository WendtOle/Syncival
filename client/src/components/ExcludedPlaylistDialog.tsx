import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { InfoIcon } from "./Icons";
import { useExcludedInfo } from "../hooks/useExcludedInfo";
import { useState } from "react";

export const ExcludedPlaylistDialog = () => {
  const { songs, playlists } = useExcludedInfo();
  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton color="inherit" onClick={() => setOpen(true)}>
        <InfoIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Excluded from analysis</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div>{playlists} playlists excluded</div>
            <div>{songs} songs excluded</div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
