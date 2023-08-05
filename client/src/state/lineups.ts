import { atomWithStorage } from "jotai/utils";
import { Lineup } from "./types";

export const lineupsAtom = atomWithStorage<Lineup[]>("lineups", []);
