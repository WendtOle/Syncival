import { IconButton, Menu, MenuItem, MenuList } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { ExclusionState, usePlaylistExclusion } from "./usePlaylistExclusion";

export const ExcludeMenu = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { state, excludeFollowed, includeAll } = usePlaylistExclusion();

  const onOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const onClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <>
      <IconButton color="inherit" onClick={onOpen}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        open={open}
        onClose={onClose}
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
          <MenuItem
            disabled={state === ExclusionState.NONE}
            onClick={includeAll}
          >
            Include all playlists
          </MenuItem>
          <MenuItem
            disabled={state === ExclusionState.ALL}
            onClick={excludeFollowed}
          >
            Exclude all followed
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
