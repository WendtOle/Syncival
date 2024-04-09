import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export enum SortOption {
  DEFAULT = "default",
  PLAYLISTS = "playlists",
  ARTISTS = "artists",
}

export const SortOptionNames: Record<SortOption, string> = {
  [SortOption.DEFAULT]: "Show all songs",
  [SortOption.ARTISTS]: "Group by artist",
  [SortOption.PLAYLISTS]: "Group by playlist",
};

export const sortAtom = atomWithStorage<SortOption>(
  "groupBy",
  SortOption.DEFAULT
);

export const appBarHeightAtom = atom(0);
export const scrolledAtom = atom(false);

export const spotifyTrackIdAtom = atom<string | null>(null);

export enum ArtistFilterOption {
  ALL = "all",
  SPOTIFY = "spotify",
  NON_SPOTIFY = "nonSpotify",
}

export enum GroupableFilterOption {
  FOLLOWED = "followed",
  LIKED = "liked",
  ALBUMS = "albums",
}

export enum FilterGroupOption {
  SPOTIFY_GROUP = "spotifyGroup",
}

export const filterGroupMapping: Record<
  FilterGroupOption,
  GroupableFilterOption[]
> = {
  [FilterGroupOption.SPOTIFY_GROUP]: [
    GroupableFilterOption.FOLLOWED,
    GroupableFilterOption.LIKED,
    GroupableFilterOption.ALBUMS,
  ],
};

export const groupableFilterMapping: Record<
  GroupableFilterOption,
  FilterGroupOption
> = {
  [GroupableFilterOption.FOLLOWED]: FilterGroupOption.SPOTIFY_GROUP,
  [GroupableFilterOption.LIKED]: FilterGroupOption.SPOTIFY_GROUP,
  [GroupableFilterOption.ALBUMS]: FilterGroupOption.SPOTIFY_GROUP,
};

export const artistsFilterAtom = atom<
  | ArtistFilterOption
  | { filter: FilterGroupOption; items: Array<GroupableFilterOption> }
>(ArtistFilterOption.SPOTIFY);
