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

export type ArtistFilter = "all" | "spotify" | "nonSpotify";
export const artistsFilterAtom = atom<ArtistFilter>("all");
