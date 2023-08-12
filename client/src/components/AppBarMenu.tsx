import { Divider, IconButton, Menu, MenuItem, MenuList } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { LineupInspectionDialogButton } from "./LineupInspectionDialogButton";
import { AppBarMenuLineupSection } from "./AppBarMenuLineupSection";
import { LinueupCreationDialogWrapper } from "./LineupCreationDialogWrapper";
import { CreatePlaylistDialogWrapper } from "./CreatePlaylistDialogWrapper";
import { useNavigate } from "react-router-dom";

export const AppBarMenu = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

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
          <LineupInspectionDialogButton>
            {(onClick) => <MenuItem onClick={onClick}>Inspect lineup</MenuItem>}
          </LineupInspectionDialogButton>
          <LinueupCreationDialogWrapper>
            {(onClick) => <MenuItem onClick={onClick}>Add lineup</MenuItem>}
          </LinueupCreationDialogWrapper>
          <Divider />
          <MenuItem onClick={() => navigate("/exclude")}>
            Filter playlist
          </MenuItem>
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
