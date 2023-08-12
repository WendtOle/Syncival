import { useAtomValue } from "jotai";
import {
  excludedPlaylistIdsAtom,
  playlistInformationAtom,
  playlistSnapShotAtom,
} from "../state/main";
import { Playlist } from "../state/types";
import { useLineupPlaylist } from "./useLineupPlaylist";
import { useMemo } from "react";

type SomeType = Record<string, Playlist>;

export const usePlaylists = (): { all: SomeType; selected: SomeType } => {
  const playlists = useAtomValue(playlistInformationAtom);
  const playlistSnapshots = useAtomValue(playlistSnapShotAtom);
  const excludedPlaylists = useAtomValue(excludedPlaylistIdsAtom);
  const lineupPlaylists = useLineupPlaylist();
  const fromAppCreatedPlaylists = useMemo(
    () => Object.values(lineupPlaylists).flat(),
    [lineupPlaylists],
  );

  const all = useMemo(
    () =>
      Object.entries(playlists).reduce(
        (prev, [id, playlist]) => {
          if (fromAppCreatedPlaylists.includes(id)) {
            return prev;
          }
          const snapShotId = playlist.snapShotId;
          const snapshot = playlistSnapshots[snapShotId] ?? [];
          return {
            ...prev,
            [id]: {
              ...playlist,
              tracks: snapshot,
            },
          };
        },
        {} as Record<string, Playlist>,
      ),
    [playlists, playlistSnapshots, fromAppCreatedPlaylists],
  );

  const selected = useMemo(
    () =>
      Object.entries(all).reduce(
        (prev, [id, playlist]) => {
          if (excludedPlaylists.includes(id)) {
            return prev;
          }
          return { ...prev, [id]: playlist };
        },
        {} as Record<string, Playlist>,
      ),
    [all, excludedPlaylists],
  );
  return { all, selected };
};
