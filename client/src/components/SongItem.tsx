import { Artist, TrackV2 } from "../state/types";
import "./Playlist.css";
import { ListItemButton, ListItemText, Typography } from "@mui/material";
import { useSetAtom } from "jotai";
import { spotifyTrackIdAtom } from "../state/ui";
import { SpotifyMetadataType, truncate } from "../util/truncateSpotifyMetadata";
import { SongArtistInfo } from "./SongArtistInfo";
import { CoverArt } from "./CoverArt";

export const SongItem = ({
  id,
  name,
  artists,
  relevantArtists,
  imageUrl,
  albumName,
}: Omit<TrackV2, "relevantArtists"> & { relevantArtists?: Artist[] }) => {
  const setSoptifyId = useSetAtom(spotifyTrackIdAtom);
  const secondary = () => {
    return (
      <>
        <SongArtistInfo
          artists={artists}
          relevantArtists={relevantArtists}
          length={30}
        />
        {truncate(formattedAlbumName, SpotifyMetadataType.ALBUM)}
      </>
    );
  };

  const formattedAlbumName = albumName ? ` - ${albumName}` : "";
  return (
    <ListItemButton
      key={id}
      onClick={() => setSoptifyId(id)}
      sx={{ paddingTop: 1, paddingBottom: 1 }}
    >
      <CoverArt imageUrl={imageUrl} />
      <ListItemText
        primary={
          <Typography variant="body1" sx={{}}>
            {truncate(name, SpotifyMetadataType.SONG, 31)}
          </Typography>
        }
        secondary={secondary()}
        sx={{ marginLeft: 2 }}
      />
    </ListItemButton>
  );
};
