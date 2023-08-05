import { useAtomValue } from "jotai";
import { lineupsAtom } from "../state/data";
import { selectedLineupKeyAtom } from "../state/main";

export const useLineupTitle = (): string => {
  const lineups = useAtomValue(lineupsAtom);
  const selectedLineupKey = useAtomValue(selectedLineupKeyAtom);
  return lineups.find(({ key }) => key === selectedLineupKey)?.name || "";
};
