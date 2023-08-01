import { useState } from "react";
import { useAtom } from "jotai";
import { dataAtom } from "../state/data";
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import LineupIcon from "@mui/icons-material/FormatListBulleted";
import { useNavigate } from "react-router-dom";
import { Add, Delete } from "@mui/icons-material";
import { SettingsDialogButton } from "./SettingsDialogButton";

export const ArtistInput = () => {
  const [text, setText] = useState("");
  const [data, setData] = useAtom(dataAtom);
  const [open, setOpen] = useState(false);
  const [lineupName, setLineupName] = useState("");
  const navigate = useNavigate();

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

  const deleteLineUp = (event: any, key: string) => {
    event.stopPropagation();
    setData((cur) => {
      const newData = { ...cur };
      delete newData[key];
      return newData;
    });
  };

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Lineup
          </Typography>
          <SettingsDialogButton />
        </Toolbar>
      </AppBar>
      <List>
        {Object.entries(data).map(([key, value]) => (
          <ListItemButton key={key} onClick={() => navigate("/lineup/" + key)}>
            <ListItemIcon>
              <LineupIcon />
            </ListItemIcon>
            <ListItemText primary={key} secondary={`${value.length} artists`} />
            <ListItemSecondaryAction
              onClick={(event) => deleteLineUp(event, key)}
            >
              <Delete />
            </ListItemSecondaryAction>
          </ListItemButton>
        ))}
      </List>
      <Fab
        sx={{ position: "fixed", bottom: 72, right: 16 }}
        color="info"
        onClick={() => setOpen((cur) => !cur)}
      >
        <Add />
      </Fab>

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
    </div>
  );
};
