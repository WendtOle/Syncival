import { useAtomValue } from "jotai";
import { dataAtom } from "../state/data";
import { selectedLineupKeyAtom } from "../state/main";

export const useLineupTitle = (): {
  selectedLineupTitle: string;
  getLineupTitle: (id: string) => string;
} => {
  const data = useAtomValue(dataAtom);
  const selectedLineupKey = useAtomValue(selectedLineupKeyAtom);
  const selectedLineupTitle =
    data.find(({ key }) => key === selectedLineupKey)?.name || "";
  return {
    selectedLineupTitle,
    getLineupTitle: (id: string) =>
      data.find(({ key }) => key === id)?.name || "",
  };
};
