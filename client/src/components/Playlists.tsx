import { useState } from "react";
import { excludedPlaylistIdsAtom, playlistsAtom } from "../state/main";
import { useAtomValue } from "jotai";
import { AppBar, List, Toolbar, Typography } from "@mui/material";
import { PlaylistItem } from "./PlaylistItem";
import { SettingsDialogButton } from "./SettingsDialogButton";

export const Playlists = () => {
  const playlists = useAtomValue(playlistsAtom);
  const [showOnlySelected] = useState(false);
  const excludedPlaylistId = useAtomValue(excludedPlaylistIdsAtom);
  const filteredPlaylists = playlists.filter(
    ({ id }) => !showOnlySelected || !excludedPlaylistId.includes(id),
  );

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Your playlists
          </Typography>
          <SettingsDialogButton />
        </Toolbar>
      </AppBar>
      <List dense sx={{ marginBottom: 8 }}>
        {filteredPlaylists.map(({ id }) => (
          <PlaylistItem key={id} id={id} />
        ))}
      </List>
    </div>
  );
};
