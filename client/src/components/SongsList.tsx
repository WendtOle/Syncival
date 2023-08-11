import { List, ListSubheader } from "@mui/material";
import { useMatchedSongs } from "../hooks/useMatchedSongs";
import { SongItem } from "./SongItem";
import { useAtomValue } from "jotai";
import { matchedSongsByPlaylistAtom, tracksAtom } from "../state/main";
import { sortAtom } from "../state/ui";

export const SongsList = () => {
  const songs = useMatchedSongs();
  const tracks = useAtomValue(tracksAtom);
  const groupedSongs = useAtomValue(matchedSongsByPlaylistAtom);
  const sort = useAtomValue(sortAtom);
  const sortedSongs = songs.sort((a, b) => a.name.localeCompare(b.name));

  if (sort === "playlists") {
    return (
      <List
        dense
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 300,
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        {Object.keys(groupedSongs).map((playlist) => (
          <li key={`section-${playlist}`}>
            <ul>
              <ListSubheader>{playlist}</ListSubheader>
              {groupedSongs[playlist].map((songId) => {
                const song = tracks[songId];
                return <SongItem key={song.id} {...song} />;
              })}
            </ul>
          </li>
        ))}
      </List>
    );
  }

  return (
    <List dense>
      {sortedSongs.map((song) => (
        <SongItem key={song.id} {...song} />
      ))}
    </List>
  );
};
