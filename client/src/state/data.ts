import { atomWithStorage } from "jotai/utils";

export const dataAtom = atomWithStorage<Record<string, string[]>>("data", {});
