import {
  CircularProgress,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { usePlaylist } from "../hooks/usePlaylist";

export const PlaylistItem = ({ id }: { id: string }) => {
  const { playlist, exclude } = usePlaylist(id);

  if (!playlist) {
    return <CircularProgress />;
  }

  const { name, trackAmount, excluded, tracks } = playlist;

  return (
    <ListItemButton
      key={id}
      onClick={exclude}
      sx={{
        pl: 4,
      }}
    >
      <ListItemIcon>
        {!excluded ? (
          <CheckBoxIcon color="info" />
        ) : (
          <CheckBoxOutlineBlankIcon color="info" />
        )}
      </ListItemIcon>
      <ListItemText primary={name + ` (${trackAmount ?? tracks.length})`} />
    </ListItemButton>
  );
};
