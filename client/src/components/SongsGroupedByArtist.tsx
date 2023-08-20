import { SongItem } from "./SongItem";
import { ListSubHeader } from "./ListSubHeader";
import { useSongs } from "../hooks/useSongs";
import { useFilteredArtists } from "../hooks/useFilteredArtists";
import { SpotifyIFrameWrapper } from "./SpotifyIFrameWrapper";
import { List } from "./List";

export const SongsGroupedByArtist = () => {
  const filteredArtists = useFilteredArtists();
  const tracks = useSongs();

  const sortedArtists = filteredArtists.sort(
    (a, b) => b.tracks.length - a.tracks.length,
  );

  return (
    <List>
      {sortedArtists.map(({ id, name, tracks: artistTracks }) => (
        <li key={`section-${id}`}>
          <ul>
            <SpotifyIFrameWrapper id={id} type="artist">
              {(onClick) => <ListSubHeader onClick={onClick} name={name} />}
            </SpotifyIFrameWrapper>
            {artistTracks
              .map((id) => tracks[id as any])
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((song, index) => {
                return <SongItem key={`${id}-${song.id}-${index}`} {...song} />;
              })}
          </ul>
        </li>
      ))}
    </List>
  );
};
