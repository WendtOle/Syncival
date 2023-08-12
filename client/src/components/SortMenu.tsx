import {
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  IconButton,
} from "@mui/material";
import { useAtom } from "jotai";
import { SortOption, SortOptionNames, sortAtom } from "../state/ui";
import CheckIcon from "@mui/icons-material/Check";
import { useRef, useState } from "react";
import SortIcon from "@mui/icons-material/Sort";

export const SortMenu = () => {
  const [sort, setSort] = useAtom(sortAtom);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const onClick = (option: SortOption) => () =>
    setSort((cur) => {
      if (cur === option) return SortOption.DEFAULT;
      return option;
    });

  return (
    <>
      <IconButton color="inherit" onClick={() => setOpen(true)} ref={anchorRef}>
        <SortIcon />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-end"
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: "right top",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <MenuList dense>
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
                        <ListItemText inset={sort !== key}>
                          {value}
                        </ListItemText>
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};
