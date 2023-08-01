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
import { RouteEnum } from "../state/types";

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
  const setData = useSetAtom(dataAtom);

  if (!id) {
    return <CircularProgress />;
  }

  const deleteLinup = () => {
    setData((current) => current.filter((current) => current.key !== id));
    navigate(RouteEnum.LINEUP_LIST);
  };

  return (
    <div key={id}>
      <Toolbar>
        <Button variant="outlined" color="info" onClick={deleteLinup}>
          Delete
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
