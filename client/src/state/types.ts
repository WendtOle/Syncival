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

export interface ArtistV3 {
  id: string;
  name: string;
  tracks: string[];
}

export interface ArtistV4 {
  id: string;
  name: string;
  tracks: TrackV2[];
}

export interface Track {
  id: string;
  name: string;
  artists: Artist[];
  imageUrl?: string;
  albumName: string;
}

export interface TrackV2 {
  id: string;
  name: string;
  artists: Artist[];
  imageUrl?: string;
  relevantArtists: Artist[];
  albumName: string;
}

export interface Playlist {
  name: string;
  id: string;
  isOwn: boolean;
  trackAmount?: number;
  snapShotId: string;
  snapShotDate: Date;
  tracks: Track[];
  imageUrl?: string;
}

export type PlaylistInformation = Omit<Playlist, "tracks">;

export interface Lineup {
  name: string;
  key: string;
  artists: string[];
}

export enum RouteEnum {
  ARTISTS = "/",
  EXCLUDE = "/exclude",
  LINEUP = "/lineup",
  NEW_LINEUP = "/add",
  LINEUP_SELECTION = "/lineup-selection",
}
