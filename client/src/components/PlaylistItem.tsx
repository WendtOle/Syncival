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
import { CoverArt } from "./CoverArt";

export const PlaylistItem = ({ id }: { id: string }) => {
  const { playlist, exclude } = usePlaylist(id);

  if (!playlist) {
    return <CircularProgress />;
  }

  const { name, trackAmount, excluded, tracks, isOwn, imageUrl } = playlist;

  return (
    <ListItemButton
      key={id}
      onClick={exclude}
      style={
        excluded
          ? { backgroundColor: "whiteSmoke", textDecoration: "line-through" }
          : {}
      }
      sx={{ paddingTop: 1, paddingBottom: 1 }}
    >
      <CoverArt imageUrl={imageUrl} />
      <ListItemText
        primary={name}
        secondary={`${isOwn ? "Own" : "Followed"} - ${
          trackAmount ?? tracks.length
        } tracks`}
        sx={{ marginLeft: 2 }}
      />
      <ListItemSecondaryAction>
        <SpotifyIFrameWrapper id={id} type="playlist">
          {(onClick) => (
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              disabled={id === "liked_songs"}
            >
              <InfoIcon />
            </IconButton>
          )}
        </SpotifyIFrameWrapper>
      </ListItemSecondaryAction>
    </ListItemButton>
  );
};
