import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { Types, useData } from "./useData";
import PendingIcon from "@mui/icons-material/Pending";
import CheckIcon from "@mui/icons-material/Check";
import { Delete } from "@mui/icons-material";

export const DataDrawerSection = () => {
  const { loadData, infos, clear } = useData();

  return (
    <List dense>
      <ListItem>
        <ListItemText primary="Data" />
        <ListItemSecondaryAction>
          <IconButton onClick={clear}>
            <Delete />
          </IconButton>
          <IconButton onClick={loadData}>
            <DownloadIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
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
          primary={`Loaded ${infos[Types.PLAYLIST].count} playlists`}
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
          primary={`Songs of ${infos[Types.SONG].count} playlists fetched`}
        />
      </ListItem>
    </List>
  );
};
