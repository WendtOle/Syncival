import { useAtom } from "jotai";
import { excludedPlaylistIdsAtom } from "../state/main";
import { usePlaylists } from "./usePlaylists";
import { Playlist } from "../state/types";

export const usePlaylist = (
  id: string,
): { playlist: Playlist & { excluded: boolean }; exclude: () => void } => {
  const { all: playlists } = usePlaylists();
  const playlist = playlists[id as any];
  const [excludedPlaylistId, setExcludedPlaylistId] = useAtom(
    excludedPlaylistIdsAtom,
  );
  const excluded = excludedPlaylistId.includes(id);
  const exclude = () => {
    setExcludedPlaylistId((cur) => {
      if (cur.includes(id)) {
        return cur.filter((curId) => curId !== id);
      }
      return [...cur, id];
    });
  };
  return { playlist: { ...playlist, excluded }, exclude };
};
