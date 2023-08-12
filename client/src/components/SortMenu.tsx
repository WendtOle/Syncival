import {
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Menu,
} from "@mui/material";
import { useAtom } from "jotai";
import { SortOption, SortOptionNames, sortAtom } from "../state/ui";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";

export const SortMenuWrapper = ({
  children,
}: {
  children: (onClick: (props: any) => void) => any;
}) => {
  const [sort, setSort] = useAtom(sortAtom);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const onClick = (option: SortOption) => () =>
    setSort((cur) => {
      if (cur === option) return SortOption.DEFAULT;
      return option;
    });

  return (
    <>
      {children((e) => setAnchorEl(e.currentTarget))}
      <Menu
        open={anchorEl !== null}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
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
      </Menu>
    </>
  );
};
