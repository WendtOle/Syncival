import { useMemo } from "react";
import { Playlist, Track } from "../state/types";
import { usePlaylists } from "./usePlaylists";

export const getSongsFromPlaylists = (playlists: Playlist[]) => {
  return playlists.reduce(
    (prev, { tracks }) => {
      tracks.forEach((track) => (prev[track.id] = track));
      return prev;
    },
    {} as Record<string, Track>,
  );
};

export const useSongs = () => {
  const { selected } = usePlaylists();
  return useMemo(
    () => getSongsFromPlaylists(Object.values(selected)),
    [selected],
  );
};
