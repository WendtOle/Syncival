import { useAtomValue } from "jotai";
import { playlistInformationAtom } from "../state/main";
import { useLineups } from "./useLineups";

export const useLineupPlaylist = () => {
  const { lineups } = useLineups();
  const playlists = useAtomValue(playlistInformationAtom);
  return Object.values(lineups)
    .map(({ key }) => key)
    .reduce(
      (prev, key) => {
        const playlistsWithLineupKey = Object.values(playlists).filter(
          ({ name }) => name.includes(key),
        );
        return { ...prev, [key]: playlistsWithLineupKey.map(({ id }) => id) };
      },
      {} as Record<string, string[]>,
    );
};
