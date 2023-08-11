import { MenuList, MenuItem, ListItemText, ListItemIcon } from "@mui/material";
import { useAtom } from "jotai";
import { SortOption, SortOptionNames, sortAtom } from "../state/ui";
import CheckIcon from "@mui/icons-material/Check";

export const SortMenu = () => {
  const [sort, setSort] = useAtom(sortAtom);

  const onClick = (option: SortOption) => () =>
    setSort((cur) => {
      if (cur === option) return SortOption.DEFAULT;
      return option;
    });

  return (
    <MenuList dense disablePadding>
      <MenuItem>Group by</MenuItem>
      {Object.entries(SortOptionNames).map(([key, value]) => (
        <MenuItem onClick={onClick(key as SortOption)} key={key}>
          {sort === key && (
            <ListItemIcon color="inherit">
              <CheckIcon />
            </ListItemIcon>
          )}
          <ListItemText inset={sort !== key}>{value}</ListItemText>
        </MenuItem>
      ))}
    </MenuList>
  );
};
