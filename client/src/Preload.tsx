import { useAtomValue } from "jotai";
import { playlistSnapShotAtom } from "./state/main";

export const Preload = () => {
  useAtomValue(playlistSnapShotAtom);
  return null;
};
