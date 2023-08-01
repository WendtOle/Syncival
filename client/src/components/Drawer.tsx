import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer as MuiDrawer,
  styled,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { RouteEnum } from "../state/types";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const Drawer = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (newOpen: boolean) => void;
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const goTo = (route: RouteEnum) => () => {
    setOpen(false);
    navigate(route);
  };

  return (
    <MuiDrawer open={open}>
      <DrawerHeader>
        <IconButton onClick={() => setOpen(false)}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem onClick={goTo(RouteEnum.ARTISTS)}>
          <ListItemIcon>
            <PersonSearchIcon />
          </ListItemIcon>
          <ListItemText primary="Comparison" />
        </ListItem>
        <ListItem onClick={goTo(RouteEnum.LINEUP_LIST)}>
          <ListItemIcon>
            <FormatListBulletedIcon />
          </ListItemIcon>
          <ListItemText primary="Lineup" />
        </ListItem>
        <ListItem onClick={goTo(RouteEnum.LOADING)}>
          <ListItemIcon>
            <DownloadIcon />
          </ListItemIcon>
          <ListItemText primary="Data" />
        </ListItem>
      </List>
    </MuiDrawer>
  );
};
