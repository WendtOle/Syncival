import { ArtistResult } from "./ArtistResult";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { RouteEnum } from "../state/types";
import { useLineupFetch } from "../hooks/useLineupFetch";
import { useFetchPlaylists } from "../hooks/useFetchPlaylists";
import { InformationSnackbar } from "./InformationSnackbar";
import { ExcludePlaylistScreen } from "./ExludePlaylistScreen";
import { LinueupCreationScreen } from "./screens/LineupCreationScreen";
import { LineupInspectionScreen } from "./screens/LineupInspectionScreen";

export const App = () => {
  useLineupFetch();
  useFetchPlaylists();
  return (
    <>
      <Routes>
        <Route path={RouteEnum.ARTISTS} element={<ArtistResult />} />
        <Route path={RouteEnum.EXCLUDE} element={<ExcludePlaylistScreen />} />
        <Route
          path={RouteEnum.NEW_LINEUP}
          element={<LinueupCreationScreen />}
        />
        <Route path={RouteEnum.LINEUP} element={<LineupInspectionScreen />} />
      </Routes>
      <InformationSnackbar />
    </>
  );
};
