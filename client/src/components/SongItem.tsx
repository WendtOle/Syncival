import { Track } from "../state/types";
import "./Playlist.css";
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import SongIcon from "@mui/icons-material/Audiotrack";
import LaunchIcon from "@mui/icons-material/Launch";

export const SongItem = ({
  id,
  name,
  artists,
  containsLineUpArtist,
}: Track & { containsLineUpArtist: boolean }) => {
  return (
    <ListItem
      key={id}
      sx={{ background: containsLineUpArtist ? "#bffde6" : "" }}
    >
      <ListItemIcon>
        <SongIcon />
      </ListItemIcon>
      <ListItemText
        primary={name}
        secondary={artists.map(({ name }) => name).join(", ")}
      />
      <ListItemSecondaryAction>
        <IconButton
          onClick={() => window.open(`spotify:track:${id}`, "_blank")}
        >
          <LaunchIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
