import {
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Menu,
} from "@mui/material";
import { useAtom } from "jotai";
import { SortOption, SortOptionNames, sortAtom } from "../state/ui";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import SortIcon from "@mui/icons-material/Sort";

export const SortMenu = () => {
  const [sort, setSort] = useAtom(sortAtom);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const onClick = (option: SortOption) => () => {
    setSort((cur) => {
      if (cur === option) return SortOption.DEFAULT;
      return option;
    });
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
        <SortIcon />
      </IconButton>
      <Menu
        open={anchorEl !== null}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuList dense disablePadding>
          <MenuItem disabled>Group by</MenuItem>
          {Object.entries(SortOptionNames).map(([key, value]) => {
            const selected = sort === key;
            return (
              <MenuItem
                onClick={onClick(key as SortOption)}
                key={key}
                selected={selected}
              >
                {selected && (
                  <ListItemIcon color="inherit">
                    <CheckIcon />
                  </ListItemIcon>
                )}
                <ListItemText inset={sort !== key}>{value}</ListItemText>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </>
  );
};
