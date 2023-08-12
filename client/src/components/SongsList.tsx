import { List } from "@mui/material";
import { useMatchedSongs } from "../hooks/useMatchedSongs";
import { SongItem } from "./SongItem";

export const SongsList = () => {
  const { defaulty: songs } = useMatchedSongs();
  const sortedSongs = songs.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <List dense>
      {sortedSongs.map((song) => (
        <SongItem key={song.id} {...song} />
      ))}
    </List>
  );
};
