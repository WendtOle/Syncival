import { TrackV2 } from "../state/types";
import { useSongs } from "./useSongs";
import { useFilteredArtists } from "./useFilteredArtists";
import { usePlaylists } from "./usePlaylists";

export const useMatchedSongs = (): {
  defaulty: TrackV2[];
  byPlaylist: Record<string, string[]>;
} => {
  const filteredArtists = useFilteredArtists();
  const playlists = usePlaylists();
  const filteredArtistIds = filteredArtists.map((artist) => artist.id);
  const matchedSongs = [
    ...new Set(filteredArtists.map(({ tracks }) => tracks).flat()),
  ];

  const songs = useSongs();
  const defaulty = matchedSongs.map((id) => {
    const song = songs[id];
    const output: TrackV2 = {
      ...song,
      relevantArtists: song.artists.filter((artist) =>
        filteredArtistIds.includes(artist.id),
      ),
    };
    return output;
  });

  const byPlaylist = Object.entries(playlists).reduce(
    (prev, [id, { tracks }]) => {
      const filteredTracks = tracks
        .map(({ id }) => id)
        .filter((id) => matchedSongs.includes(id));
      if (filteredTracks.length === 0) {
        return prev;
      }
      return { ...prev, [id]: filteredTracks };
    },
    {} as Record<string, string[]>,
  );

  return { defaulty, byPlaylist };
};
