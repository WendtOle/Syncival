import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { PlaylistInformation, Track } from "./types";

export const playlistInformationAtom = atomWithStorage<
  Record<string, PlaylistInformation>
>("playlists", {});

export const playlistSnapShotAtom = atomWithStorage<Record<string, Track[]>>(
  "snapshots",
  {},
);

export const excludedPlaylistIdsAtom = atom<string[]>([]);

export const selectedLineupKeyAtom = atomWithStorage<string | null>(
  "selectedLineup",
  null,
);

export const focusedAtom = atom<{
  id: string;
  type: "artist" | "playlist";
} | null>(null);

export const playlistTabExpandedAtom = atomWithStorage<
  "own" | "followed" | null
>("expanded", "own");

export const informationToastAtom = atom<string | null>(null);
