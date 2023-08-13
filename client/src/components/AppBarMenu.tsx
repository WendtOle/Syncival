import { Divider, IconButton, Menu, MenuItem, MenuList } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { AppBarMenuLineupSection } from "./AppBarMenuLineupSection";
import { CreatePlaylistDialogWrapper } from "./CreatePlaylistDialogWrapper";
import { useNavigate } from "react-router-dom";
import { RouteEnum } from "../state/types";
import { useExcludedInfo } from "../hooks/useExcludedInfo";

export const AppBarMenu = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { playlists: excludedPlaylists } = useExcludedInfo();

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
          <AppBarMenuLineupSection />
          <Divider />
          <MenuItem onClick={() => navigate(RouteEnum.LINEUP)}>
            Inspect lineup
          </MenuItem>
          <MenuItem onClick={() => navigate(RouteEnum.NEW_LINEUP)}>
            Add lineup
          </MenuItem>
          <Divider />
          {excludedPlaylists === 0 && (
            <MenuItem onClick={() => navigate(RouteEnum.EXCLUDE)}>
              Filter playlist
            </MenuItem>
          )}
          <CreatePlaylistDialogWrapper>
            {(onClick) => (
              <MenuItem onClick={onClick}>Create playlist</MenuItem>
            )}
          </CreatePlaylistDialogWrapper>
          <MenuItem onClick={() => localStorage.clear()}>Clear cache</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
