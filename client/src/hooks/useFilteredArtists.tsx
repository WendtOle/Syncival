import { useArtists } from "./useArtists";
import { useLineupArtists } from "./useLineupArtists";

export const useFilteredArtists = () => {
  const linupArtists = useLineupArtists();
  const spotifyAtists = useArtists();

  const preprocessLineupArtists = linupArtists.map((artist) =>
    artist.toLowerCase(),
  );
  return Object.values(spotifyAtists).filter(({ name }) =>
    preprocessLineupArtists.includes(name.toLocaleLowerCase()),
  );
};
