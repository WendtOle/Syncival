import { List } from "@mui/material";
import { PlaylistItem } from "./PlaylistItem";
import { usePlaylists } from "../hooks/usePlaylists";

export const Playlists = () => {
  const { all: playlists } = usePlaylists();

  return (
    <>
      <List dense>
        <List dense disablePadding>
          {Object.values(playlists)
            .sort((a, b) => (a.tracks.length > b.tracks.length ? -1 : 1))
            .map(({ id }) => (
              <PlaylistItem key={id} id={id} />
            ))}
        </List>
      </List>
    </>
  );
};
