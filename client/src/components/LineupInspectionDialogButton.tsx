import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useLineups } from "../hooks/useLineups";

export const LineupInspectionDialogButton = ({
  children,
}: {
  children: (onClick: () => void) => void;
}) => {
  const { deleteSelected, selected } = useLineups();
  const [open, setOpen] = useState(false);
  const artists = selected?.artists ?? [];

  const deleteLinup = () => {
    deleteSelected();
    setOpen(false);
  };

  return (
    <>
      {children(() => setOpen(true))}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{ width: 300 }}>{selected?.name ?? ""}</DialogTitle>
        <Typography sx={{ marginLeft: 4, marginBottom: 2 }} variant="body2">
          {artists.length} Artists
        </Typography>
        <DialogContent sx={{ height: 250, paddingTop: 0 }}>
          <List dense>
            {artists
              .sort((a, b) => (a > b ? 1 : -1))
              .map((artist, index) => (
                <ListItem key={artist + index}>
                  <ListItemText primary={artist} />
                </ListItem>
              ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={deleteLinup}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
