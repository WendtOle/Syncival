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
  FOLLOWED = "followed",
  LIKED = "liked",
  LIKED_AND_FOLLOWED = "liked&followed",
}

export const artistsFilterAtom = atom<ArtistFilterOption>(
  ArtistFilterOption.SPOTIFY
);
