import { ArtistV2, ArtistV3 } from "../state/types";
import { useSongs } from "./useSongs";
import { useArtists } from "./useArtists";

export const useArtistInfo = (id?: string): ArtistV2 | undefined => {
  const artists = useArtists();
  const artist: ArtistV3 | undefined = id ? artists[id] : undefined;
  const tracks = useSongs();

  if (!artist) {
    return undefined;
  }
  const output = {
    ...artist,
    tracks: artist?.tracks.map((id) => tracks[id]) ?? [],
  };
  return output;
};
