import {
  Divider,
  IconButton,
  Drawer as MuiDrawer,
  styled,
  useTheme,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { LineupDrawerSection } from "./LineupDrawerSection";
import { PlaylistDrawerSection } from "./PlaylistDrawerSection";
import { DataDrawerSection } from "./DataDrawerSection";

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
      <PlaylistDrawerSection onSelect={() => setOpen(false)} />
      <Divider />
      <DataDrawerSection />
    </MuiDrawer>
  );
};
