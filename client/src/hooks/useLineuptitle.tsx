import { useAtomValue } from "jotai";
import { dataAtom } from "../state/data";
import { selectedLineupKeyAtom } from "../state/main";

export const useLineupTitle = (): string => {
  const data = useAtomValue(dataAtom);
  const selectedLineupKey = useAtomValue(selectedLineupKeyAtom);
  return data.find(({ key }) => key === selectedLineupKey)?.name || "";
};
