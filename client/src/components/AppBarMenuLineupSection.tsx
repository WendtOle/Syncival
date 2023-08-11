import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useLineups } from "../hooks/useLineups";

export const AppBarMenuLineupSection = () => {
  const {lineups, selectLineup} = useLineups();

  return (
    <>
      {lineups.map(({ key, name, selected }) => {
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
