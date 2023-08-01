import {
  excludedPlaylistIdsAtom,
  playlistTabExpandedAtom,
  playlistsAtom,
} from "../state/main";
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
  Typography,
} from "@mui/material";
import { PlaylistItem } from "./PlaylistItem";
import { Toolbar } from "./Toolbar";
import PlaylistIcon from "@mui/icons-material/Folder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FollowedPlaylistIcon from "@mui/icons-material/Public";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export const Playlists = () => {
  const playlists = useAtomValue(playlistsAtom);
  const [visible, setVisible] = useAtom(playlistTabExpandedAtom);
  const [excludedPlaylistId, setExcludedPlaylistId] = useAtom(
    excludedPlaylistIdsAtom,
  );
  const filteredPlaylists = playlists.filter(
    ({ id }) => !excludedPlaylistId.includes(id),
  );

  const allPublicToggledOff = playlists
    .filter(({ isOwn }) => !isOwn)
    .every(({ id }) => excludedPlaylistId.includes(id));

  const togglePublic = (event: any) => {
    event?.stopPropagation();
    const foreignPlaylistsIds = playlists
      .filter(({ isOwn }) => !isOwn)
      .map(({ id }) => id);
    if (foreignPlaylistsIds.every((id) => excludedPlaylistId.includes(id))) {
      setExcludedPlaylistId((cur) =>
        cur.filter((id) => !foreignPlaylistsIds.includes(id)),
      );
      return;
    }
    setExcludedPlaylistId((cur) => [...cur, ...foreignPlaylistsIds]);
  };

  return (
    <>
      <Toolbar>
        <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
          Use {filteredPlaylists.length} / {playlists.length} playlists
        </Typography>
      </Toolbar>

      <List sx={{ marginBottom: 8 }}>
        <ListItem
          onClick={() => setVisible((cur) => (cur === "own" ? null : "own"))}
        >
          <ListItemIcon>
            <PlaylistIcon />
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
            <FollowedPlaylistIcon />
          </ListItemIcon>
          <ListItemText primary="Followed playlists" />
          <ListItemSecondaryAction>
            <IconButton onClick={togglePublic}>
              {!allPublicToggledOff ? (
                <VisibilityIcon />
              ) : (
                <VisibilityOffIcon />
              )}
            </IconButton>
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
        {visible === "followed" && <Divider />}
      </List>
    </>
  );
};
