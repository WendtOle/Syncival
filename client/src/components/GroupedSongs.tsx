import { SongItem } from "./SongItem";
import { ListSubHeader } from "./ListSubHeader";
import { usePlaylists } from "../hooks/usePlaylists";
import { useSongs } from "../hooks/useSongs";
import { useMatchedSongs } from "../hooks/useMatchedSongs";
import { SpotifyIFrameWrapper } from "./SpotifyIFrameWrapper";
import { List } from "./List";

export const GroupedSongs = () => {
  const tracks = useSongs();
  const { selected: playlists } = usePlaylists();
  const { byPlaylist: groupedSongs } = useMatchedSongs();

  const sortedGroupedSongs = Object.entries(groupedSongs).sort(
    (a, b) => b[1].length - a[1].length,
  );

  return (
    <>
      <List>
        {sortedGroupedSongs
          .map(([playlist]) => playlist)
          .map((playlist) => (
            <li key={`section-${playlist}`}>
              <ul>
                <SpotifyIFrameWrapper id={playlist} type="playlist">
                  {(onClick) => (
                    <ListSubHeader
                      onClick={onClick}
                      name={playlists[playlist].name}
                    />
                  )}
                </SpotifyIFrameWrapper>
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
