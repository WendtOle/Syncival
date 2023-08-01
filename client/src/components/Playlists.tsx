import { useState } from "react";
import { excludedPlaylistIdsAtom, playlistsAtom } from "../state/main";
import { useAtomValue } from "jotai";
import { List } from "@mui/material";
import { PlaylistItem } from "./PlaylistItem";

export const Playlists = () => {
  const playlists = useAtomValue(playlistsAtom);
  const [showOnlySelected] = useState(false);
  const excludedPlaylistId = useAtomValue(excludedPlaylistIdsAtom);
  const filteredPlaylists = playlists.filter(
    ({ id }) => !showOnlySelected || !excludedPlaylistId.includes(id),
  );

  return (
    <List dense sx={{ marginBottom: 8 }}>
      {filteredPlaylists.map(({ id }) => (
        <PlaylistItem key={id} id={id} />
      ))}
    </List>
  );
};
