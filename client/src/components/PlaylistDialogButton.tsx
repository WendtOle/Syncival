import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Playlists } from "./Playlists";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";
import { useToggleFollowedPlaylists } from "../hooks/useToggleFollowedPlaylists";

export const PlaylistDialogButton = () => {
  const [open, setOpen] = useState(false);
  const { toggle } = useToggleFollowedPlaylists();
  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <MoreHorizIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Spotify playlists</DialogTitle>
        <DialogContent>
          <Playlists />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={toggle}>
            Toggle followed
          </Button>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
