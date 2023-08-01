import { ArtistV2, Track } from "../state/types";

export const extractArtists = (songs: Track[]) =>
  Object.values(
    songs.reduce(
      (acc, song) => {
        song.artists.forEach((artist) => {
          if (!acc[artist.id]) {
            acc[artist.id] = { ...artist, tracks: [] };
          }
          acc[artist.id].tracks.push(song);
        });
        return acc;
      },
      {} as { [key: string]: ArtistV2 },
    ),
  );
