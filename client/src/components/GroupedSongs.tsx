import { List } from "@mui/material";
import { SongItem } from "./SongItem";
import { useNavigate } from "react-router-dom";
import { ListSubHeader } from "./ListSubHeader";
import { usePlaylists } from "../hooks/usePlaylists";
import { useSongs } from "../hooks/useSongs";
import { useMatchedSongs } from "../hooks/useMatchedSongs";
import { useContentHeight } from "../hooks/useContentHeight";

export const GroupedSongs = () => {
  const navigate = useNavigate();
  const tracks = useSongs();
  const playlists = usePlaylists();
  const { byPlaylist: groupedSongs } = useMatchedSongs();
  const maxHeight = useContentHeight();

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
          maxHeight: maxHeight - 8,
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
