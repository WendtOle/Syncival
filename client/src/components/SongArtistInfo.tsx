import { Typography } from "@mui/material";
import { Artist } from "../state/types";
import {
  truncate,
  SpotifyMetadataType,
  truncateWithoutRespectingSpotify,
} from "../util/truncateSpotifyMetadata";

export const SongArtistInfo = ({
  artists,
  relevantArtists,
  length,
}: {
  artists: Artist[];
  relevantArtists?: Artist[];
  length: number;
}) => {
  if (
    !relevantArtists ||
    relevantArtists.length === 0 ||
    relevantArtists.length === artists.length
  ) {
    const artistsAsString = artists.map(({ name }) => name).join(", ");
    return (
      <Typography
        variant="body2"
        sx={{ display: "inline" }}
        color="text.primary"
        component="span"
      >
        {truncate(artistsAsString, SpotifyMetadataType.ARTIST, length)}
      </Typography>
    );
  }
  const notRelevantArtists = artists.filter(
    ({ id }) => !(relevantArtists?.map(({ id }) => id) ?? []).includes(id),
  );
  const relevatArtistsString = truncate(
    relevantArtists.map(({ name }) => name).join(", "),
    SpotifyMetadataType.ARTIST,
    length,
  );
  const notRelevantArtistsString = `, ${truncateWithoutRespectingSpotify(
    notRelevantArtists.map(({ name }) => name).join(", "),
    length - relevatArtistsString.length,
  )}`;
  return (
    <>
      <Typography
        variant="body2"
        sx={{ display: "inline" }}
        color="text.primary"
        component="span"
      >
        {relevatArtistsString}
      </Typography>
      {notRelevantArtistsString}
    </>
  );
};
