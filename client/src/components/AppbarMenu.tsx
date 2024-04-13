import { IconButton, Menu, MenuList, Divider, MenuItem } from "@mui/material";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";

export const AppbarMenu = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const onOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const onClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
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
          <MenuItem onClick={clearLocalStorage}>Clear cache</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
