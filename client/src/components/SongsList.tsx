import { useMatchedSongs } from "../hooks/useMatchedSongs";
import { List } from "./List";
import { SongItem } from "./SongItem";

export const SongsList = () => {
  const { defaulty: songs } = useMatchedSongs();
  const sortedSongs = songs.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <List>
      {sortedSongs.map((song) => (
        <SongItem key={song.id} {...song} />
      ))}
    </List>
  );
};
