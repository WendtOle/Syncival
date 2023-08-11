import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useAtomValue, useSetAtom, useAtom } from "jotai";
import { lineupsAtom } from "../state/lineups";
import { informationToastAtom, selectedLineupKeyAtom } from "../state/main";

export const AppBarMenuLineupSection = () => {
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
  return (
    <>
      {lineups.map(({ key, name }) => {
        const selected = selectedLineupKey === key;
        return (
          <MenuItem
            key={key}
            onClick={() => selectLineup(key)}
            selected={selected}
          >
            {selected && (
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
            )}
            <ListItemText inset={!selected}>{name}</ListItemText>
          </MenuItem>
        );
      })}
    </>
  );
};
