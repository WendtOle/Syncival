import { Artist, TrackV2 } from "../state/types";
import "./Playlist.css";
import { ListItemButton, ListItemText } from "@mui/material";
import { useSetAtom } from "jotai";
import { spotifyTrackIdAtom } from "../state/ui";
import { CoverArt } from "./CoverArt";

export const SongItem = ({
  id,
  name,
  artists,
  relevantArtists,
  imageUrl,
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
    <ListItemButton
      key={id}
      onClick={() => setSoptifyId(id)}
      sx={{ paddingTop: 1, paddingBottom: 1 }}
    >
      <CoverArt imageUrl={imageUrl} />
      <ListItemText
        primary={name}
        secondary={secondary()}
        sx={{ marginLeft: 2 }}
      />
    </ListItemButton>
  );
};
