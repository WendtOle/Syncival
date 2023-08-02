import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useAtomValue, useAtom } from "jotai";
import { playlistsAtom, excludedPlaylistIdsAtom } from "../state/main";

export const PlaylistDrawerSection = ({
  onSelect,
}: {
  onSelect: () => void;
}) => {
  const playlists = useAtomValue(playlistsAtom);
  const [excludedPlaylistId, setExcludedPlaylistId] = useAtom(
    excludedPlaylistIdsAtom,
  );

  const allPublicToggledOff = playlists
    .filter(({ isOwn }) => !isOwn)
    .every(({ id }) => excludedPlaylistId.includes(id));

  const togglePublic = (event: any) => {
    event?.stopPropagation();
    onSelect();
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
    <List dense>
      <ListItem>
        <ListItemText primary="Spotify playlists" />
        <ListItemSecondaryAction hidden>
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItemButton disabled>
        <ListItemIcon>
          <CheckBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Own" />
      </ListItemButton>
      <ListItemButton onClick={togglePublic}>
        <ListItemIcon>
          {allPublicToggledOff ? (
            <CheckBoxOutlineBlankIcon />
          ) : (
            <CheckBoxIcon color="info" />
          )}
        </ListItemIcon>
        <ListItemText primary="Followed" />
      </ListItemButton>
    </List>
  );
};
