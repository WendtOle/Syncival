import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  List,
  DialogActions,
} from "@mui/material";
import { useSetAtom } from "jotai";
import { useState } from "react";
import { dataAtom } from "../state/data";

export const LinueupCreationDialogButton = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const setData = useSetAtom(dataAtom);
  const [lineupName, setLineupName] = useState("");

  const parsedArtists = text
    .replace(/"/g, "")
    .split(/,|\n/)
    .map((artist: string) => artist.trim())
    .filter((artist: string) => artist.length > 0);

  const addLineUp = () => {
    setData((cur) => ({ ...cur, [lineupName]: parsedArtists }));
    setLineupName("");
    setOpen(false);
  };

  const clear = () => {
    setText("");
  };

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen((cur) => !cur)}>
        Add lineup
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create Lineup manually</DialogTitle>
        <DialogContent>
          <TextField
            size="small"
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={lineupName}
            onChange={(event) => setLineupName(event.target.value)}
          />
          <div className="options">{parsedArtists.length} artists found</div>
          <List>
            {parsedArtists.map((artist: string, index) => (
              <div className="artist" key={index}>
                {artist}
              </div>
            ))}
          </List>
          <label>
            Enter your artists here:
            <textarea
              rows={6}
              style={{ width: "100%" }}
              placeholder="Enter your artists here ..."
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
          </label>
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
