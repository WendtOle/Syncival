import { useFilteredArtists } from "../hooks/useFilteredArtists";
import { useLineups } from "../hooks/useLineups";
import { AppBar } from "./AppBar";
import { List } from "./List";
import { ArtistListItem } from "./ArtistListItem";

export const ArtistList = () => {
  const { selected } = useLineups();
  const filteredArtists = useFilteredArtists();

  const sortedArtists = (selected?.artists ?? [])
    .map((artistName): { name: string; id?: string } => {
      const matchedArtist = filteredArtists.find(
        (artist) => artist.name === artistName,
      );
      if (matchedArtist) {
        return matchedArtist;
      }
      return {
        name: artistName,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <AppBar title={selected?.name ?? "No lineup selected"} showBackButton />
      <List>
        {sortedArtists.map(({ name, id }, i) => (
          <ArtistListItem name={name} id={id} key={`artist-${name}-${i}`} />
        ))}
      </List>
    </>
  );
};
