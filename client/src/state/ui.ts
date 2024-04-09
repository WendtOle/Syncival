import { atom } from "jotai";

export const appBarHeightAtom = atom(0);
export const scrolledAtom = atom(false);

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
