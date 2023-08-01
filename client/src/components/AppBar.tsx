import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { RouteEnum } from "../state/types";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Drawer } from "./Drawer";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const Header: Record<RouteEnum, () => string> = {
  [RouteEnum.ARTISTS]: () => "TODO",
  [RouteEnum.LINEUP_LIST]: () => "Lineups",
  [RouteEnum.LOADING]: () => "Data",
  [RouteEnum.PLAYLIST]: () => "TODO",
  [RouteEnum.PLAYLIST_LIST]: () => "Your playlists",
  [RouteEnum.LINEUP]: () => "TODO",
};

const baseRoutes = [
  RouteEnum.LINEUP_LIST,
  RouteEnum.PLAYLIST_LIST,
  RouteEnum.ARTISTS,
  RouteEnum.LOADING,
];

export const AppBar = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  console.log(location.pathname);
  const showMenuButton = baseRoutes.includes(location.pathname as RouteEnum);

  return (
    <>
      <MuiAppBar position="sticky">
        <Toolbar>
          {showMenuButton ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setDrawerOpen(true)}
              edge="start"
              sx={{ mr: 2, ...(drawerOpen && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => navigate(-1)}
            >
              <ArrowBackIosIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {Header[location.pathname as RouteEnum]?.()}
          </Typography>
        </Toolbar>
      </MuiAppBar>
      <Drawer open={drawerOpen} setOpen={() => setDrawerOpen(false)} />
    </>
  );
};
