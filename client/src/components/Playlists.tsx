import { playlistTabExpandedAtom, playlistsAtom } from "../state/main";
import { useAtom, useAtomValue } from "jotai";
import {
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { PlaylistItem } from "./PlaylistItem";
import PlaylistIcon from "@mui/icons-material/Folder";
import FollowedPlaylistIcon from "@mui/icons-material/Public";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export const Playlists = () => {
  const playlists = useAtomValue(playlistsAtom);
  const [visible, setVisible] = useAtom(playlistTabExpandedAtom);

  return (
    <>
      <List dense>
        <ListItem
          onClick={() => setVisible((cur) => (cur === "own" ? null : "own"))}
        >
          <ListItemIcon>
            <PlaylistIcon color="info" />
          </ListItemIcon>
          <ListItemText primary="Own playlists" />
          <IconButton>
            {visible === "own" ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </ListItem>
        {visible === "own" && <Divider />}
        <Collapse in={visible === "own"}>
          <List dense disablePadding>
            {playlists
              .filter(({ isOwn }) => isOwn)
              .sort((a, b) =>
                a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
              )
              .map(({ id }) => (
                <PlaylistItem key={id} id={id} />
              ))}
          </List>
        </Collapse>
        {visible === "own" && <Divider />}
        <ListItem
          onClick={() =>
            setVisible((cur) => (cur === "followed" ? null : "followed"))
          }
        >
          <ListItemIcon>
            <FollowedPlaylistIcon color="info" />
          </ListItemIcon>
          <ListItemText primary="Followed playlists" />
          <ListItemSecondaryAction>
            <IconButton>
              {visible === "followed" ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        {visible === "followed" && <Divider />}
        <Collapse in={visible === "followed"}>
          <List dense disablePadding>
            {playlists
              .filter(({ isOwn }) => !isOwn)
              .sort((a, b) =>
                a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
              )
              .map(({ id }) => (
                <PlaylistItem key={id} id={id} />
              ))}
          </List>
        </Collapse>
      </List>
    </>
  );
};
