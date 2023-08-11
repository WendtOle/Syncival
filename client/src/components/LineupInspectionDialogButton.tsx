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
import { useLineupTitle } from "../hooks/useLineuptitle";
import { useLineupArtists } from "../hooks/useLineupArtists";
import { useAtom } from "jotai";
import { lineupsAtom } from "../state/lineups";
import { selectedLineupKeyAtom } from "../state/main";

export const LineupInspectionDialogButton = ({
  children,
}: {
  children: (onClick: () => void) => void;
}) => {
  const [open, setOpen] = useState(false);
  const selectedLineupTitle = useLineupTitle();
  const [selectedLineupKey, setSelectedLineupKey] = useAtom(
    selectedLineupKeyAtom,
  );
  const [lineups, setLineups] = useAtom(lineupsAtom);
  const artists = useLineupArtists();

  const deleteLinup = () => {
    setLineups((current) =>
      current.filter((current) => current.key !== selectedLineupKey),
    );
    setOpen(false);
    setSelectedLineupKey(lineups[0].key);
  };

  return (
    <>
      {children(() => setOpen(true))}
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
