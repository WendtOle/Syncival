import {
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PendingIcon from "@mui/icons-material/Pending";
import CheckIcon from "@mui/icons-material/Check";
import { Types, useData } from "./useData";
import { Toolbar } from "./Toolbar";

export const DataLoading = () => {
  const { loadData, infos, clear } = useData();

  return (
    <div>
      <Toolbar>
        <Button variant="outlined" onClick={clear}>
          Clear cache
        </Button>
        <Button variant="outlined" onClick={loadData} sx={{ marginLeft: 1 }}>
          Download
        </Button>
      </Toolbar>
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
      </List>
    </div>
  );
};
