import { useAtomValue } from "jotai";
import { lineupsAtom } from "../state/data";
import { selectedLineupKeyAtom } from "../state/main";

export const useLineupArtists = (id?: string): string[] => {
  const lineups = useAtomValue(lineupsAtom);
  const selectedLineupKey = useAtomValue(selectedLineupKeyAtom);
  return (
    lineups.find(({ key }) => key === (id || selectedLineupKey))?.artists || []
  );
};
