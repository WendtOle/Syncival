import { useAtomValue } from "jotai";
import { playlistSnapShotAtom, playlistAtom } from "../state/main";

export const useIsLoading = () => {
  const snapshots = useAtomValue(playlistSnapShotAtom);
  const playlists = useAtomValue(playlistAtom);
  return Object.keys(snapshots).length !== Object.keys(playlists).length;
};
