import { useAtomValue, atom } from "jotai";
import { useMemo } from "react";
import { artistsAtom, tracksAtom } from "../state/main";
import { ArtistV2, ArtistV3 } from "../state/types";

export const useArtistInfo = (id?: string): ArtistV2 | undefined => {
  const artist: ArtistV3 | undefined = useAtomValue(
    useMemo(() => atom((get) => (id ? get(artistsAtom)[id] : undefined)), [id]),
  );

  const tracks = useAtomValue(tracksAtom);
  if (!artist) {
    return undefined;
  }
  const output = {
    ...artist,
    tracks: artist?.tracks.map((id) => tracks[id]) ?? [],
  };
  return output;
};
