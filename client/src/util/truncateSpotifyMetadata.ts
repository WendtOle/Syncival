export enum SpotifyMetadataType {
  ALBUM = "albumName",
  SONG = "song",
  ARTIST = "artist",
}

// https://developer.spotify.com/documentation/design#attribution see "Using our content - Considerations"
const minTruncateLength: Record<SpotifyMetadataType, number> = {
  [SpotifyMetadataType.ALBUM]: 25,
  [SpotifyMetadataType.SONG]: 23,
  [SpotifyMetadataType.ARTIST]: 18,
};

export const truncate = (
  input: string,
  type: SpotifyMetadataType,
  length?: number,
) => {
  const truncateLength = Math.max(length ?? 0, minTruncateLength[type]);
  return input.length > truncateLength
    ? `${input.substring(0, truncateLength)}...`
    : input;
};

export const truncateWithoutRespectingSpotify = (
  input: string,
  truncateLength: number,
) => {
  return input.length > truncateLength
    ? `${input.substring(0, truncateLength)}...`
    : input;
};
