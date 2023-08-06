import { useMemo } from "react";
import {
  excludedPlaylistIdsAtom,
  playlistSongsAtom,
  playlistInformationAtom,
} from "../state/main";
import { atom, useAtom, useAtomValue } from "jotai";
import {
  CircularProgress,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

export const PlaylistItem = ({ id }: { id: string }) => {
  const playlist = useAtomValue(
    useMemo(() => atom((get) => get(playlistInformationAtom)[id]), [id]),
  );
  const songs = useAtomValue(
    useMemo(() => atom((get) => get(playlistSongsAtom)[id] ?? []), [id]),
  );
  const [excludedPlaylistId, setExcludedPlaylistId] = useAtom(
    excludedPlaylistIdsAtom,
  );

  if (!playlist) {
    return <CircularProgress />;
  }

  const { name, trackAmount } = playlist;

  const visible = !excludedPlaylistId.includes(id);
  const toggle = (id: string) => {
    setExcludedPlaylistId((cur) => {
      if (cur.includes(id)) {
        return cur.filter((curId) => curId !== id);
      }
      return [...cur, id];
    });
  };

  return (
    <ListItemButton
      key={id}
      onClick={() => toggle(id)}
      sx={{
        pl: 4,
      }}
    >
      <ListItemIcon>
        {visible ? (
          <CheckBoxIcon color="info" />
        ) : (
          <CheckBoxOutlineBlankIcon color="info" />
        )}
      </ListItemIcon>
      <ListItemText primary={name + ` (${trackAmount ?? songs.length})`} />
    </ListItemButton>
  );
};
