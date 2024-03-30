import { atom } from "jotai";
import { FetchingStates } from "./types";

export const lineupFetchedAtom = atom(false);
export const playlistsFetchedStateAtom = atom<FetchingStates>("not-fetched");
export const snapshotFetchedStateAtom = atom<FetchingStates>("not-fetched");
export const artistFetchedStateAtom = atom<FetchingStates>("not-fetched");
