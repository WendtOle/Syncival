import { useSetAtom, useAtom } from "jotai";
import { lineupsAtom } from "../state/lineups";
import { informationToastAtom, selectedLineupKeyAtom } from "../state/main";

interface Lineup {
  key: string;
  name: string;
  selected: boolean;
}

export const useLineups = (): {
  lineups: Lineup[];
  select: (key: string) => void;
  deleteSelected: () => void;
} => {
  const [lineups, setLineups] = useAtom(lineupsAtom);
  const setInformationToast = useSetAtom(informationToastAtom);
  const [selectedLineupKey, setSelectedLineupKey] = useAtom(
    selectedLineupKeyAtom,
  );

  const select = (key: string) => {
    setSelectedLineupKey(key);
    const lineup = lineups.find((lineup) => lineup.key === key);
    if (!lineup) return;
    setInformationToast(`Lineup "${lineup.name}" selected`);
  };

  const deleteSelected = () => {
    setLineups((current) =>
      current.filter((current) => current.key !== selectedLineupKey),
    );
    setSelectedLineupKey(lineups[0].key);
  };

  return {
    lineups: lineups.map(({ key, name }) => ({
      key,
      name,
      selected: selectedLineupKey === key,
    })),
    select,
    deleteSelected,
  };
};
