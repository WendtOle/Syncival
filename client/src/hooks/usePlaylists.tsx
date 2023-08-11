import { useAtomValue } from "jotai";
import { playlistInformationAtom, playlistSnapShotAtom } from "../state/main";
import { Playlist } from "../state/types";
import { useLineupPlaylist } from "./useLineupPlaylist";

export const usePlaylists = () => {
  const playlists = useAtomValue(playlistInformationAtom);
  const playlistSnapshots = useAtomValue(playlistSnapShotAtom);
  const lineupPlaylists = useLineupPlaylist();
  const fromAppCreatedPlaylists = Object.values(lineupPlaylists).flat();

  return Object.entries(playlists).reduce(
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
  );
};
