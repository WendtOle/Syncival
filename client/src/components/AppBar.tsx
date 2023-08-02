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
import { usePageTitle } from "../hooks/usePageTitle";
import { LineupInspectionDialogButton } from "./LineupInspectionDialogButton";

const baseRoutes = [RouteEnum.ARTISTS, RouteEnum.LOADING];

export const AppBar = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const showMenuButton = baseRoutes.includes(location.pathname as RouteEnum);
  const pageTitle = usePageTitle();
  const showLineupButton = location.pathname === RouteEnum.ARTISTS;

  return (
    <>
      <MuiAppBar position="sticky">
        <Toolbar sx={{ justifyContent: "space-between" }}>
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
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, marginLeft: 4 }}
          >
            {pageTitle}
          </Typography>
          {showLineupButton && <LineupInspectionDialogButton />}
        </Toolbar>
      </MuiAppBar>
      <Drawer open={drawerOpen} setOpen={() => setDrawerOpen(false)} />
    </>
  );
};
