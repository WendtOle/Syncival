import {
  CircularProgress,
  IconButton,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { usePlaylist } from "../hooks/usePlaylist";
import { InfoIcon } from "./Icons";
import { SpotifyIFrameWrapper } from "./SpotifyIFrameWrapper";

export const PlaylistItem = ({ id }: { id: string }) => {
  const { playlist, exclude } = usePlaylist(id);

  if (!playlist) {
    return <CircularProgress />;
  }

  const { name, trackAmount, excluded, tracks, isOwn } = playlist;

  return (
    <ListItemButton
      key={id}
      onClick={exclude}
      style={
        excluded
          ? { backgroundColor: "whiteSmoke", textDecoration: "line-through" }
          : {}
      }
      sx={{ pl: 4 }}
    >
      <ListItemText
        primary={name}
        secondary={`${isOwn ? "Own" : "Followed"} - ${
          trackAmount ?? tracks.length
        } tracks`}
      />
      <ListItemSecondaryAction>
        <SpotifyIFrameWrapper id={id} type="playlist">
          {(onClick) => (
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              <InfoIcon color="info" />
            </IconButton>
          )}
        </SpotifyIFrameWrapper>
      </ListItemSecondaryAction>
    </ListItemButton>
  );
};
