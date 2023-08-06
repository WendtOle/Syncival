import { useLocation } from "react-router-dom";
import { RouteEnum } from "../state/types";
import { useLineupTitle } from "./useLineuptitle";

export const usePageTitle = (): string => {
  const location = useLocation();
  const selectedLineupTitle = useLineupTitle();

  if (location.pathname === RouteEnum.ARTISTS) {
    return selectedLineupTitle;
  }

  console.warn("No header for route", location.pathname);
  return "";
};
