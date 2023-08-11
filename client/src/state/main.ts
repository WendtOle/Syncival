import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { PlaylistInformation, Track } from "./types";
import { lineupsAtom } from "./lineups";

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

export const lineupAtom = atom<string[]>((get) => {
  const lineupId = get(selectedLineupKeyAtom);
  if (!lineupId) {
    return [];
  }
  return (
    get(lineupsAtom).find((entry) => entry.key === lineupId)?.artists ?? []
  );
});
export const focusedAtom = atom<{
  id: string;
  type: "artist" | "playlist";
} | null>(null);

export const playlistTabExpandedAtom = atomWithStorage<
  "own" | "followed" | null
>("expanded", "own");

export const informationToastAtom = atom<string | null>(null);
