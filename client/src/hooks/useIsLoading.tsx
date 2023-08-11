import { useAtomValue } from "jotai";
import { playlistSnapShotAtom, playlistInformationAtom } from "../state/main";

export const useIsLoading = () => {
  const snapshots = useAtomValue(playlistSnapShotAtom);
  const playlists = useAtomValue(playlistInformationAtom);
  return Object.keys(snapshots).length !== Object.keys(playlists).length;
};
