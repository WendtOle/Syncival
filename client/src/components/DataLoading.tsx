import {
  AppBar,
  Button,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PendingIcon from "@mui/icons-material/Pending";
import { RouteEnum } from "./App";
import CheckIcon from "@mui/icons-material/Check";
import { Types, useData } from "./useData";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";

export const DataLoading = () => {
  const navigate = useNavigate();
  const { loadData, infos, clear } = useData();

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Loading Data
          </Typography>
          <IconButton color="inherit" onClick={clear}>
            <DeleteIcon />
          </IconButton>
          <IconButton color="inherit" onClick={loadData}>
            <DownloadIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <List>
        <ListItem>
          <ListItemIcon>
            {infos[Types.PLAYLIST].loading ? (
              <CircularProgress />
            ) : infos[Types.PLAYLIST].finished ? (
              <CheckIcon />
            ) : (
              <PendingIcon />
            )}
          </ListItemIcon>
          <ListItemText
            primary="Playlists"
            secondary={`Loaded ${infos[Types.PLAYLIST].count} playlists`}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            {infos[Types.SONG].loading ? (
              <CircularProgress
                variant="determinate"
                value={
                  (infos[Types.SONG].count / infos[Types.PLAYLIST].count) * 100
                }
              />
            ) : infos[Types.SONG].finished ? (
              <CheckIcon />
            ) : (
              <PendingIcon />
            )}
          </ListItemIcon>
          <ListItemText
            primary="Tracks"
            secondary={`Loaded songs of ${infos[Types.SONG].count} playlists`}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            {infos[Types.LINEUP].loading ? (
              <CircularProgress />
            ) : infos[Types.LINEUP].finished ? (
              <CheckIcon />
            ) : (
              <PendingIcon />
            )}
          </ListItemIcon>
          <ListItemText
            primary="Lineups"
            secondary={`Loaded ${infos[Types.LINEUP].count} lineups`}
          />
        </ListItem>
        <ListItem
          sx={{
            position: "fixed",
            zIndex: 20000,
            bottom: 0,
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{ borderRadius: 16, width: "100%" }}
            onClick={() => navigate(RouteEnum.PLAYLIST_LIST)}
          >
            Go to app
          </Button>
        </ListItem>
      </List>
    </div>
  );
};
