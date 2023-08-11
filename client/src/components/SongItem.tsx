import { Artist, TrackV2 } from "../state/types";
import "./Playlist.css";
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import SongIcon from "@mui/icons-material/Audiotrack";
import LaunchIcon from "@mui/icons-material/Launch";
import { useNavigate } from "react-router-dom";
import { SongDialogWrapper } from "./SongDialogWrapper";

export const SongItem = ({
  id,
  name,
  artists,
  relevantArtists,
}: Omit<TrackV2, "relevantArtists"> & { relevantArtists?: Artist[] }) => {
  const navigate = useNavigate();
  const secondary = () => {
    if (!relevantArtists) {
      return artists.map(({ name }) => name).join(", ");
    }
    const notRelevantArtists = artists.length - relevantArtists.length;
    return (
      relevantArtists.map(({ name }) => name).join(", ") +
      (notRelevantArtists > 0 ? ` (+${notRelevantArtists})` : "")
    );
  };
  return (
    <SongDialogWrapper id={id}>
      {(onClick) => (<ListItemButton key={id} onClick={onClick}>
        <ListItemIcon>
          <SongIcon />
        </ListItemIcon>
        <ListItemText primary={name} secondary={secondary()} />
      </ListItemButton>)}
    </SongDialogWrapper>
    
  );
};
