import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
} from "@mui/material";
import { useState } from "react";
import { usePageTitle } from "../hooks/usePageTitle";
import { AppBarMenu } from "./AppBarMenu";
import SortIcon from "@mui/icons-material/Sort";
import { SortMenu } from "./SortMenu";

export const AppBar = () => {
  const pageTitle = usePageTitle();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  return (
    <>
      <MuiAppBar position="sticky">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component="div"
            color="inherit"
            sx={{ flexGrow: 1, fontWeight: 400, letterSpacing: -0.5 }}
          >
            {pageTitle}
          </Typography>
          <IconButton
            color="inherit"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <SortIcon />
          </IconButton>
          <AppBarMenu />
        </Toolbar>
      </MuiAppBar>
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
        <SortMenu />
      </Menu>
    </>
  );
};
