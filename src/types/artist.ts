export type Artist =
  | SpotifyApi.ArtistObjectFull
  | Pick<SpotifyApi.ArtistObjectFull, "name">;
