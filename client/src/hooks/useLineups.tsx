import { useSetAtom, useAtom } from "jotai";
import { lineupsAtom } from "../state/lineups";
import { informationToastAtom, selectedLineupKeyAtom } from "../state/main";
import { Lineup as ActualLineup } from "../state/types";
import { useMemo } from "react";

interface Lineup {
  key: string;
  name: string;
  selected: boolean;
}

export const useLineups = (): {
  lineups: Lineup[];
  select: (key: string) => void;
  deleteSelected: () => void;
  selected: ActualLineup | undefined;
  add: (props: { name: string; artists: string[] }) => void;
} => {
  const [lineups, setLineups] = useAtom(lineupsAtom);
  const setInformationToast = useSetAtom(informationToastAtom);
  const [selectedLineupKey, setSelectedLineupKey] = useAtom(
    selectedLineupKeyAtom
  );

  const adjustedLineups = useMemo(
    () =>
      lineups.map(({ key, name }) => ({
        key,
        name,
        selected: selectedLineupKey === key,
      })),
    [selectedLineupKey, lineups]
  );

  const selected = useMemo(
    () => lineups.find(({ key }) => key === selectedLineupKey),
    [lineups, selectedLineupKey]
  );

  const select = (key: string) => {
    setSelectedLineupKey(key);
    const lineup = lineups.find((lineup) => lineup.key === key);
    if (!lineup) return;
    setInformationToast(`Lineup "${lineup.name}" selected`);
  };

  const deleteSelected = () => {
    setLineups((current) =>
      current.filter((current) => current.key !== selectedLineupKey)
    );
    setSelectedLineupKey(lineups[0].key);
  };

  const add = ({ name, artists }: { name: string; artists: string[] }) => {
    const key = Math.random().toString(36).substring(2);
    setLineups((cur) => {
      return [...cur, { key, name, artists }];
    });
    setSelectedLineupKey(key);
  };

  return {
    lineups: adjustedLineups,
    select,
    deleteSelected,
    selected,
    add,
  };
};
