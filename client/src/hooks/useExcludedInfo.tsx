import { usePlaylists } from "./usePlaylists";

export const useExcludedInfo = () => {
  const { all, selected } = usePlaylists();
  const amount = Object.values(all).length - Object.values(selected).length;
  if (amount === 0) {
    return "Exclude playlists";
  }
  return amount === 1
    ? `${amount} playlist excluded`
    : `${amount} playlists excluded`;
};
