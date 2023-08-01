import {
  AppBar,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { useMemo } from "react";
import { dataAtom } from "../state/data";
import PersonIcon from "@mui/icons-material/Person";
import { lineupIdAtom } from "../state/main";

export const Lineup = () => {
  const { id } = useParams();
  const artists = useAtomValue(
    useMemo(() => atom((get) => (id ? get(dataAtom)[id] : [])), [id]),
  );
  const navigate = useNavigate();
  const setLineupKey = useSetAtom(lineupIdAtom);

  if (!id) {
    return <CircularProgress />;
  }

  const applyLineup = () => {
    setLineupKey(id);
    navigate("/playlists");
  };

  return (
    <div key={id}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {id}
          </Typography>
          <Button variant="outlined" color="inherit" onClick={applyLineup}>
            Use lineup
          </Button>
        </Toolbar>
      </AppBar>
      <List dense sx={{ marginBottom: "64px" }}>
        {artists.map((artist: string, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={artist} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};
