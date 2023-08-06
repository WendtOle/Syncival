import { useLocation } from "react-router-dom";
import { RouteEnum } from "../state/types";
import { playlistInformationAtom } from "../state/main";
import { useAtomValue } from "jotai";
import { useLineupTitle } from "./useLineuptitle";

export const usePageTitle = (): string => {
  const location = useLocation();
  const playlists = useAtomValue(playlistInformationAtom);
  const selectedLineupTitle = useLineupTitle();

  if (location.pathname === RouteEnum.ARTISTS) {
    return selectedLineupTitle;
  }
  if (location.pathname.includes(RouteEnum.PLAYLIST.replace(":id", ""))) {
    const playlistId = location.pathname.split("/").pop() || "";
    const playlist = playlists[playlistId];
    return playlist ? `"${playlist?.name}"` : "";
  }

  console.warn("No header for route", location.pathname);
  return "";
};
