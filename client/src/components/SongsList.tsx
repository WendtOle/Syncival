import { List } from "@mui/material";
import { useMatchedSongs } from "../hooks/useMatchedSongs";
import { SongItem } from "./SongItem";
import { useContentHeight } from "../hooks/useContentHeight";

export const SongsList = () => {
  const { defaulty: songs } = useMatchedSongs();
  const sortedSongs = songs.sort((a, b) => a.name.localeCompare(b.name));
  const maxHeight = useContentHeight();

  return (
    <List
      dense
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        maxHeight: maxHeight - 16,
      }}
    >
      {sortedSongs.map((song) => (
        <SongItem key={song.id} {...song} />
      ))}
    </List>
  );
};
