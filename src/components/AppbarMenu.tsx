import { IconButton, Menu, MenuList, MenuItem } from "@mui/material";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useQueryClient } from "@tanstack/react-query";
import { QueryType } from "../provider/queries";

export const AppbarMenu = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const queryClient = useQueryClient();

  const onOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const onClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const reload = () => {
    Object.values(QueryType).forEach((queryType) => {
      queryClient.invalidateQueries({ queryKey: [queryType] });
    });
    onClose();
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
          <MenuItem onClick={reload}>Reload</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
