import { ArtistV3 } from "../state/types";
import { usePlaylists } from "./usePlaylists";

export const useArtists = () => {
  const playlists = usePlaylists();
  const tracks = Object.values(playlists)
    .map(({ tracks }) => tracks)
    .flat();

  const artists = tracks.reduce(
    (prev, track) => {
      track.artists.forEach((artist) => {
        if (prev[artist.id]) {
          if (!prev[artist.id].tracks.includes(track.id)) {
            prev[artist.id].tracks.push(track.id);
          }
        } else {
          prev[artist.id] = {
            id: artist.id,
            name: artist.name,
            tracks: [track.id],
          };
        }
      });
      return prev;
    },
    {} as Record<string, ArtistV3>,
  );
  return artists;
};
