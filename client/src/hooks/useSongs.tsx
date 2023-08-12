import { Track } from "../state/types";
import { usePlaylists } from "./usePlaylists";

export const useSongs = () => {
  const { selected: playlists } = usePlaylists();
  const tracks = Object.values(playlists)
    .map(({ tracks }) => tracks)
    .flat();
  return tracks.reduce(
    (prev, track) => {
      prev[track.id] = track;
      return prev;
    },
    {} as Record<string, Track>,
  );
};
