import { useAtomValue, useSetAtom, useAtom } from "jotai";
import { lineupsAtom } from "../state/lineups";
import { informationToastAtom, selectedLineupKeyAtom } from "../state/main";

interface Lineup {
    key: string;
    name: string;
    selected: boolean;
}

export const useLineups = (): {lineups: Lineup[], selectLineup: (key: string) => void} => {
    const lineups = useAtomValue(lineupsAtom);
    const setInformationToast = useSetAtom(informationToastAtom);
    const [selectedLineupKey, setSelectedLineupKey] = useAtom(
        selectedLineupKeyAtom,
    );

    const selectLineup = (key: string) => {
        setSelectedLineupKey(key);
        const lineup = lineups.find((lineup) => lineup.key === key);
        if (!lineup) return;
        setInformationToast(`Lineup "${lineup.name}" selected`);
      };

    return {lineups: lineups.map(({ key, name }) => ({
        key,
        name,
        selected: selectedLineupKey === key,
    })),
    selectLineup};
}
