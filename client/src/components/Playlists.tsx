import { PlaylistItem } from "./PlaylistItem";
import { usePlaylists } from "../hooks/usePlaylists";
import { List } from "./List";

export const Playlists = () => {
  const { all: playlists } = usePlaylists();

  return (
    <List>
      {Object.values(playlists)
        .sort((a, b) => (a.tracks.length > b.tracks.length ? -1 : 1))
        .map(({ id }) => (
          <PlaylistItem key={id} id={id} />
        ))}
    </List>
  );
};
