export const ACCESS_TOKEN_IDENTIFIER = "accessToken";
export const REFRESH_TOKEN_IDENTIFIER = "refreshToken";

export enum AuthenticationStatus {
  ATHENTICATED_NEW = "authenticated_new",
  AUTHENTICATED = "authenticated",
  REFRESHED = "refreshed",
  NEEDS_AUTHORIZE = "needsAuthorize",
}

export interface FetchedPlaylists {
  playlists: Playlist[];
  date: Date;
}

export interface Artist {
  id: string;
  name: string;
}

export interface ArtistV2 {
  id: string;
  name: string;
  tracks: Track[];
}

export interface Track {
  id: string;
  name: string;
  artists: Artist[];
}

export interface Playlist {
  name: string;
  id: string;
  isOwn: boolean;
  tracks?: number;
  fetched?: Date;
}
