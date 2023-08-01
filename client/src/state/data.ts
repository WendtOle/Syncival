import { atomWithStorage } from "jotai/utils";
import { DataEntry } from "./types";

export const dataAtom = atomWithStorage<DataEntry[]>("data", []);
