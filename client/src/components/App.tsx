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
import { BottomSpotifyPlayer } from "./BottomSpotifyPlayer";
import { LinupSelectionScreen } from "./screens/LineupSelectionScreen";
import { useFetchSnapshot } from "../hooks/useFetchSnapshot";

export const App = () => {
  useLineupFetch();
  useFetchPlaylists();
  useFetchSnapshot();
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ maxWidth: 800, width: "100%" }}>
        <Routes>
          <Route
            path={RouteEnum.LINEUP_SELECTION}
            element={<LinupSelectionScreen />}
          />
          <Route path={RouteEnum.ARTISTS} element={<ArtistResult />} />
          <Route path={RouteEnum.EXCLUDE} element={<ExcludePlaylistScreen />} />
          <Route
            path={RouteEnum.NEW_LINEUP}
            element={<LinueupCreationScreen />}
          />
          <Route path={RouteEnum.LINEUP} element={<LineupInspectionScreen />} />
        </Routes>
        <BottomSpotifyPlayer />
        <InformationSnackbar />
      </div>
    </div>
  );
};
