import { useAtomValue } from "jotai";
import { TrackV2 } from "../state/types";
import {
  filteredArtistsAtom,
  matchedSongsAtom,
  tracksAtom,
} from "../state/main";

export const useMatchedSongs = (): TrackV2[] => {
  const filteredArtists = useAtomValue(filteredArtistsAtom);
  const filteredArtistIds = filteredArtists.map((artist) => artist.id);
  const matchedSongs = useAtomValue(matchedSongsAtom);
  const songs = useAtomValue(tracksAtom);
  return matchedSongs.map((id) => {
    const song = songs[id];
    const output: TrackV2 = {
      ...song,
      relevantArtists: song.artists.filter((artist) =>
        filteredArtistIds.includes(artist.id),
      ),
    };
    return output;
  });
};
