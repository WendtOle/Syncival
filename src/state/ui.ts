import { atom } from "jotai";
import {
  ArtistFilterOption,
  FilterGroupOption,
  GroupableFilterOption,
} from "../types/filter";

export const appBarHeightAtom = atom(0);
export const scrolledAtom = atom(false);

export const artistsFilterAtom = atom<
  | ArtistFilterOption
  | { filter: FilterGroupOption; items: Array<GroupableFilterOption> }
>(ArtistFilterOption.SPOTIFY);
