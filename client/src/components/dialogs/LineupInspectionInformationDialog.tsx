import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useLineups } from "../../hooks/useLineups";
import { InfoIcon } from "../Icons";

export const LineupInspectionInformationDialog = () => {
  const { selected } = useLineups();
  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton color="inherit" onClick={() => setOpen(true)}>
        <InfoIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{`Lineup "${selected?.name ?? ""}"`}</DialogTitle>
        <DialogContent>
          <div style={{ marginTop: 24 }}>
            <Typography variant="body1">
              Contains {selected?.artists.length} artists
            </Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
