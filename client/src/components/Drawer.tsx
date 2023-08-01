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
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { RouteEnum } from "../state/types";
import { LineupDrawerSection } from "./LineupDrawerSection";

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

  const drawerWidth = 240;

  return (
    <MuiDrawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      open={open}
      onClose={() => setOpen(false)}
    >
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
      <LineupDrawerSection onSelect={() => setOpen(false)} />
      <Divider />
      <List dense>
        <ListItem>
          <ListItemText primary="Pages" />
        </ListItem>
        <ListItem onClick={goTo(RouteEnum.ARTISTS)}>
          <ListItemIcon>
            <PersonSearchIcon />
          </ListItemIcon>
          <ListItemText primary="Comparison" />
        </ListItem>
        <ListItem onClick={goTo(RouteEnum.LOADING)}>
          <ListItemIcon>
            <DownloadIcon />
          </ListItemIcon>
          <ListItemText primary="Data" />
        </ListItem>
      </List>
      <Divider />
    </MuiDrawer>
  );
};
