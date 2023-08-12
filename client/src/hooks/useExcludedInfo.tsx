import { usePlaylists } from "./usePlaylists";
import { getSongsFromPlaylists } from "./useSongs";

export const useExcludedInfo = (): { playlists: number; songs: number } => {
  const { all, selected } = usePlaylists();
  const allSongsAmount = Object.values(
    getSongsFromPlaylists(Object.values(all)),
  ).length;
  const selectedSongsAmount = Object.values(
    getSongsFromPlaylists(Object.values(selected)),
  ).length;
  const excludedSongsAmount = allSongsAmount - selectedSongsAmount;
  const amount = Object.values(all).length - Object.values(selected).length;

  return { playlists: amount, songs: excludedSongsAmount };
};
