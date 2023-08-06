import { useAtom, useAtomValue } from "jotai";
import { accessTokenAtom } from "../state/auth";
import { createPlaylist } from "../provider/createPlaylist";
import { lineupsAtom } from "../state/lineups";
import { filteredArtistsAtom, selectedLineupKeyAtom } from "../state/main";

export const useCreatePlaylist = () => {
  const accessToken = useAtomValue(accessTokenAtom);
  const [lineups, setLineups] = useAtom(lineupsAtom);
  const selectedLineupKey = useAtomValue(selectedLineupKeyAtom);
  const filteredArtists = useAtomValue(filteredArtistsAtom);

  const create = async () => {
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
    const { name, playlistId } = selectedLineup;
    const newPlaylistId = await createPlaylist(
      accessToken(),
      filteredArtists.map(({ tracks }) => tracks[0].id),
      name,
      playlistId,
    );
    setLineups((lineups) => [
      ...lineups.filter(({ key }) => key !== selectedLineupKey),
      {
        ...selectedLineup,
        playlistId: newPlaylistId,
      },
    ]);
    const link = `spotify:playlist:${playlistId}`;
    window.open(link, "_blank");
  };

  return create;
};
