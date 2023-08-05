import { useAtomValue } from "jotai";
import { lineupsAtom } from "../state/lineups";
import { selectedLineupKeyAtom } from "../state/main";

export const useLineupArtists = (id?: string): string[] => {
  const lineups = useAtomValue(lineupsAtom);
  const selectedLineupKey = useAtomValue(selectedLineupKeyAtom);
  return (
    lineups.find(({ key }) => key === (id || selectedLineupKey))?.artists || []
  );
};
