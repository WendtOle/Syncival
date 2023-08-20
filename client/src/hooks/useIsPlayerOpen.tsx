import { useAtomValue } from "jotai";
import { spotifyTrackIdAtom } from "../state/ui";

export const useIsPlayerOpen = () => {
  const spotifyTrackId = useAtomValue(spotifyTrackIdAtom);
  return spotifyTrackId !== null;
};
