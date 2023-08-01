import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { RouteEnum } from "../state/types";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Drawer } from "./Drawer";

const Header: Record<RouteEnum, () => string> = {
  [RouteEnum.ARTISTS]: () => "TODO",
  [RouteEnum.LINEUP_LIST]: () => "Lineups",
  [RouteEnum.LOADING]: () => "Data",
  [RouteEnum.PLAYLIST]: () => "TODO",
  [RouteEnum.PLAYLIST_LIST]: () => "Your playlists",
  [RouteEnum.LINEUP]: () => "TODO",
};

export const AppBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  return (
    <>
      <MuiAppBar position="sticky">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setDrawerOpen(true)}
            edge="start"
            sx={{ mr: 2, ...(drawerOpen && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {Header[location.pathname as RouteEnum]()}
          </Typography>
        </Toolbar>
      </MuiAppBar>
      <Drawer open={drawerOpen} setOpen={() => setDrawerOpen(false)} />
    </>
  );
};
