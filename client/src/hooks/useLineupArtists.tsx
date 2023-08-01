import { useAtomValue } from "jotai";
import { dataAtom } from "../state/data";
import { selectedLineupKeyAtom } from "../state/main";

export const useLineupArtists = (id?: string): string[] => {
  const data = useAtomValue(dataAtom);
  const selectedLineupKey = useAtomValue(selectedLineupKeyAtom);
  return (
    data.find(({ key }) => key === (id || selectedLineupKey))?.artists || []
  );
};
