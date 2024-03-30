import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { LimitedArtist, PlaylistInformation, Track } from "./types";

export const playlistInformationAtom = atomWithStorage<
  Record<string, PlaylistInformation>
>("playlists", {});

export const playlistSnapShotAtom = atomWithStorage<Record<string, Track[]>>(
  "snapshots",
  {},
);

export const excludedPlaylistIdsAtom = atomWithStorage<string[]>(
  "excludedPlaylistIds",
  [],
);

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

export const artistSnapshotsAtom = atomWithStorage<
  Record<string, LimitedArtist>
>("artists", {});
