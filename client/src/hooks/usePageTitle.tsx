import { useLocation } from "react-router-dom";
import { RouteEnum } from "../state/types";
import { playlistsAtom } from "../state/main";
import { useAtomValue } from "jotai";
import { dataAtom } from "../state/data";

export const usePageTitle = (): string => {
  const location = useLocation();
  const data = useAtomValue(dataAtom);
  const playlists = useAtomValue(playlistsAtom);

  if (location.pathname === RouteEnum.LINEUP_LIST) {
    return "Available lineups";
  }
  if (location.pathname === RouteEnum.PLAYLIST_LIST) {
    return "Your playlists";
  }
  if (location.pathname === RouteEnum.ARTISTS) {
    return "Matched artists";
  }
  if (location.pathname === RouteEnum.LOADING) {
    return "Data";
  }
  if (location.pathname.includes(RouteEnum.LINEUP.replace(":id", ""))) {
    const linupId = location.pathname.split("/").pop() || "";
    const lineup = data.find(({ key }) => key === linupId);
    return lineup ? `"${lineup.name}"` : "";
  }
  if (location.pathname.includes(RouteEnum.PLAYLIST.replace(":id", ""))) {
    const playlistId = location.pathname.split("/").pop() || "";
    const playlist = playlists.find(({ id }) => id === playlistId);
    return playlist ? `"${playlist?.name}"` : "";
  }

  console.warn("No header for route", location.pathname);
  return "";
};
