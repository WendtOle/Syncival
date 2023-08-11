import { useArtists } from "./useArtists";
import { useLineups } from "./useLineups";

export const useFilteredArtists = () => {
  const { selected } = useLineups();
  const spotifyAtists = useArtists();

  const preprocessLineupArtists = (selected?.artists ?? []).map((artist) =>
    artist.toLowerCase(),
  );
  return Object.values(spotifyAtists).filter(({ name }) =>
    preprocessLineupArtists.includes(name.toLocaleLowerCase()),
  );
};
