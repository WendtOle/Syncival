import { List } from "@mui/material";
import { SongItem } from "./SongItem";
import { useAtomValue } from "jotai";
import {
  matchedSongsByPlaylistAtom,
  playlistAtom,
} from "../state/main";
import { useNavigate } from "react-router-dom";
import { ListSubHeader } from "./ListSubHeader";
import { useSongs } from "../hooks/useSongs";

export const GroupedSongs = () => {
  const navigate = useNavigate();
  const playlists = useAtomValue(playlistAtom);
  const tracks = useSongs();
  const groupedSongs = useAtomValue(matchedSongsByPlaylistAtom);

  const sortedGroupedSongs = Object.entries(groupedSongs).sort(
    (a, b) => b[1].length - a[1].length,
  );

  return (
    <>
      <List
        dense
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: "90vh",
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        {sortedGroupedSongs
          .map(([playlist]) => playlist)
          .map((playlist) => (
            <li key={`section-${playlist}`}>
              <ul>
                <ListSubHeader
                  onClick={() => navigate(`/playlist/${playlist}`)}
                  name={playlists[playlist].name}
                />
                {groupedSongs[playlist]
                  .map((id) => tracks[id])
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((song, index) => {
                    return (
                      <SongItem
                        key={`${playlist}-${song.id}-${index}`}
                        {...song}
                      />
                    );
                  })}
              </ul>
            </li>
          ))}
      </List>
    </>
  );
};
