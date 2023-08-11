import { useAtomValue } from "jotai";
import { accessTokenAtom } from "../state/auth";
import { createPlaylist } from "../provider/createPlaylist";
import { useFilteredArtists } from "./useFilteredArtists";
import { useLineupPlaylist } from "./useLineupPlaylist";
import { useLineups } from "./useLineups";

export const useCreatePlaylist = () => {
  const accessToken = useAtomValue(accessTokenAtom);
  const { selected } = useLineups();
  const filteredArtists = useFilteredArtists();
  const lineupPlaylistId = useLineupPlaylist();

  const create = (songSelection: "all" | "one") => async () => {
    if (filteredArtists.length === 0) {
      return;
    }
    if (!selected) {
      console.warn("no lineup selected");
      return;
    }
    const { name, key } = selected;
    const newPlaylistId = await createPlaylist(
      accessToken(),
      songSelection === "one"
        ? filteredArtists.map(({ tracks }) => tracks[0])
        : filteredArtists.flatMap(({ tracks }) => tracks),
      name,
      key,
      lineupPlaylistId[key]?.[0],
    );
    const link = `spotify:playlist:${newPlaylistId}`;
    window.open(link, "_blank");
  };

  return create;
};
