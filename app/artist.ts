export type Artist =
  | SpotifyApi.ArtistObjectFull
  | Pick<SpotifyApi.ArtistObjectFull, "name">;

export const isSpotifyArtist = (
  value: any
): value is SpotifyApi.ArtistObjectFull => value["id"] !== undefined;
