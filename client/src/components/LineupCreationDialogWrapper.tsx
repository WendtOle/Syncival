import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Chip,
} from "@mui/material";
import { useState } from "react";
import { useLineups } from "../hooks/useLineups";

export const LinueupCreationDialogWrapper = ({
  children,
}: {
  children: (onClick: () => void) => any;
}) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const { add } = useLineups();
  const [lineupName, setLineupName] = useState("");

  const parsedArtists = text
    .replace(/"/g, "")
    .split(/,|\n/)
    .map((artist: string) => artist.trim())
    .filter((artist: string) => artist.length > 0);

  const addLineUp = () => {
    if (lineupName.length === 0 || parsedArtists.length === 0) {
      return;
    }
    add({ name: lineupName, artists: parsedArtists });
    setLineupName("");
    setOpen(false);
  };

  const clear = () => {
    setText("");
  };

  return (
    <>
      {children(() => setOpen(true))}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create Lineup manually</DialogTitle>
        <DialogContent>
          <TextField
            size="small"
            variant="standard"
            label="Name"
            value={lineupName}
            onChange={(event) => setLineupName(event.target.value)}
            fullWidth
          />
          <TextField
            placeholder="Enter your artists here ..."
            label="Artists"
            value={text}
            variant="standard"
            onChange={(event) => setText(event.target.value)}
            fullWidth
            rows={3}
            sx={{ marginTop: 2 }}
            multiline
          />
          <div style={{ margin: 5, marginTop: 10 }}>
            {parsedArtists.map((artist: string, index) => (
              <Chip
                key={index}
                size="small"
                label={artist}
                sx={{ margin: 0.2, padding: "0px 1px" }}
              />
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={clear}>Clear</Button>
          <Button onClick={() => setOpen(false)}>Close</Button>
          <Button onClick={addLineUp}>Apply</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
