import {
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { useMemo } from "react";
import { dataAtom } from "../state/data";
import PersonIcon from "@mui/icons-material/Person";
import { Toolbar } from "./Toolbar";
import { selectedLineupKeyAtom } from "../state/main";

export const Lineup = () => {
  const { id } = useParams();
  const artists = useAtomValue(
    useMemo(
      () =>
        atom((get) =>
          id
            ? get(dataAtom).find((current) => current.key === id)?.artists ?? []
            : [],
        ),
      [id],
    ),
  );
  const navigate = useNavigate();
  const setLineupKey = useSetAtom(selectedLineupKeyAtom);

  if (!id) {
    return <CircularProgress />;
  }

  const applyLineup = () => {
    setLineupKey(id);
    navigate("/playlists");
  };

  return (
    <div key={id}>
      <Toolbar>
        <Button variant="outlined" color="info" onClick={applyLineup}>
          Use lineup
        </Button>
      </Toolbar>
      <List dense>
        {(artists ?? []).map((artist: string, index) => (
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
