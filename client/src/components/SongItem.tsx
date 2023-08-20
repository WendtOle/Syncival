import { Artist, TrackV2 } from "../state/types";
import "./Playlist.css";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import SongIcon from "@mui/icons-material/Audiotrack";
import { useSetAtom } from "jotai";
import { spotifyTrackIdAtom } from "../state/ui";

export const SongItem = ({
  id,
  name,
  artists,
  relevantArtists,
}: Omit<TrackV2, "relevantArtists"> & { relevantArtists?: Artist[] }) => {
  const setSoptifyId = useSetAtom(spotifyTrackIdAtom);
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
    <ListItemButton key={id} onClick={() => setSoptifyId(id)}>
      <ListItemIcon>
        <SongIcon />
      </ListItemIcon>
      <ListItemText primary={name} secondary={secondary()} />
    </ListItemButton>
  );
};
