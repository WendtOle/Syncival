import { useAtomValue } from "jotai";
import { lineupsAtom } from "../state/lineups";
import { playlistInformationAtom } from "../state/main";

export const useLineupPlaylist = () => {
  const lineups = useAtomValue(lineupsAtom);
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
