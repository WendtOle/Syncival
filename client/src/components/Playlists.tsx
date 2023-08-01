import { excludedPlaylistIdsAtom, playlistsAtom } from "../state/main";
import { useAtom, useAtomValue } from "jotai";
import { Button, List, Typography } from "@mui/material";
import { PlaylistItem } from "./PlaylistItem";
import { Toolbar } from "./Toolbar";

export const Playlists = () => {
  const playlists = useAtomValue(playlistsAtom);
  const [excludedPlaylistId, setExcludedPlaylistId] = useAtom(
    excludedPlaylistIdsAtom,
  );
  const filteredPlaylists = playlists.filter(
    ({ id }) => !excludedPlaylistId.includes(id),
  );

  const togglePublic = () => {
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
        <Button variant="outlined" onClick={togglePublic}>
          Toggle public
        </Button>
      </Toolbar>
      <List dense sx={{ marginBottom: 8 }}>
        {playlists
          .sort((a, b) => (a.isOwn === b.isOwn ? 1 : a.isOwn ? -1 : 0))
          .map(({ id }) => (
            <PlaylistItem key={id} id={id} />
          ))}
      </List>
    </>
  );
};
