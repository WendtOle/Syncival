import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useLineupTitle } from "../hooks/useLineuptitle";
import { useLineupArtists } from "../hooks/useLineupArtists";
import { useAtom } from "jotai";
import { dataAtom } from "../state/data";
import { selectedLineupKeyAtom } from "../state/main";

export const LineupInspectionDialogButton = () => {
  const [open, setOpen] = useState(false);
  const { selectedLineupTitle } = useLineupTitle();
  const [selectedLineupKey, setSelectedLineupKey] = useAtom(
    selectedLineupKeyAtom,
  );
  const [data, setData] = useAtom(dataAtom);
  const artists = useLineupArtists();

  const deleteLinup = () => {
    setData((current) =>
      current.filter((current) => current.key !== selectedLineupKey),
    );
    setOpen(false);
    setSelectedLineupKey(data[0].key);
  };

  return (
    <>
      <IconButton color="inherit" onClick={() => setOpen(true)}>
        <MoreHorizIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{ width: 300 }}>{selectedLineupTitle}</DialogTitle>
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
