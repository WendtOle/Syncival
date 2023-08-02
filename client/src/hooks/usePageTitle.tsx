import { useLocation } from "react-router-dom";
import { RouteEnum } from "../state/types";
import { playlistsAtom } from "../state/main";
import { useAtomValue } from "jotai";
import { useLineupTitle } from "./useLineuptitle";

export const usePageTitle = (): string => {
  const location = useLocation();
  const playlists = useAtomValue(playlistsAtom);
  const selectedLineupTitle = useLineupTitle();

  if (location.pathname === RouteEnum.ARTISTS) {
    return selectedLineupTitle;
  }
  if (location.pathname === RouteEnum.LOADING) {
    return "Data";
  }
  if (location.pathname.includes(RouteEnum.PLAYLIST.replace(":id", ""))) {
    const playlistId = location.pathname.split("/").pop() || "";
    const playlist = playlists.find(({ id }) => id === playlistId);
    return playlist ? `"${playlist?.name}"` : "";
  }

  console.warn("No header for route", location.pathname);
  return "";
};
