import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
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
          <Typography variant="body2">
            By default all your spotify playlists are used for comparison with
            the selected lineup. Nevertheless, followed playlists can be contain
            a lot of tracks which might not be relevant for you.
          </Typography>
          {playlists > 0 && (
            <div style={{ marginTop: 24 }}>
              <Typography variant="body1">
                {playlists} playlists excluded
              </Typography>
              <Typography variant="body1">{songs} songs excluded</Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
