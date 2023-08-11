import { useAtom, useAtomValue } from "jotai";
import { accessTokenAtom } from "../state/auth";
import { createPlaylist } from "../provider/createPlaylist";
import { lineupsAtom } from "../state/lineups";
import {
  filteredArtistsAtom,
  lineupPlaylistIdsAtom,
  selectedLineupKeyAtom,
} from "../state/main";

export const useCreatePlaylist = () => {
  const accessToken = useAtomValue(accessTokenAtom);
  const [lineups, setLineups] = useAtom(lineupsAtom);
  const selectedLineupKey = useAtomValue(selectedLineupKeyAtom);
  const filteredArtists = useAtomValue(filteredArtistsAtom);
  const lineupPlaylistId = useAtomValue(lineupPlaylistIdsAtom);

  const create = (songSelection: "all" | "one") => async () => {
    if (filteredArtists.length === 0) {
      return;
    }
    if (selectedLineupKey === null) {
      console.warn("no lineup selected");
      return;
    }
    const selectedLineup = lineups.find(({ key }) => key === selectedLineupKey);
    if (!selectedLineup) {
      console.warn("no lineup selected");
      return;
    }
    const { name, key } = selectedLineup;
    const newPlaylistId = await createPlaylist(
      accessToken(),
      songSelection === "one"
        ? filteredArtists.map(({ tracks }) => tracks[0])
        : filteredArtists.flatMap(({ tracks }) => tracks),
      name,
      key,
      lineupPlaylistId[key]?.[0],
    );
    setLineups((lineups) => [
      ...lineups.filter(({ key }) => key !== selectedLineupKey),
      {
        ...selectedLineup,
        playlistId: newPlaylistId,
      },
    ]);
    const link = `spotify:playlist:${newPlaylistId}`;
    window.open(link, "_blank");
  };

  return create;
};
