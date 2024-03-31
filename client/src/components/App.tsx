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
import { FestivalScreen } from "./screens/FestivalScreen";
import { FestivalSelectionScreen } from "./screens/FestivalSelectionScreen";
import { SpotifyLogo } from "../logo/SpotifyLogo";

export const App = () => {
  useLineupFetch();
  useFetchPlaylists();
  useFetchSnapshot();
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100vh" }}>
      <div style={{ maxWidth: 800, width: "100%", height: "100%" }}>
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
          <Route path="/:festival" element={<FestivalScreen />} />
          <Route path="/" element={<FestivalSelectionScreen />} />
        </Routes>
        <BottomSpotifyPlayer />
        <InformationSnackbar />
        <div
          style={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <div
            style={{
              margin: 8,
              paddingLeft: 8,
              paddingRight: 8,
              borderRadius: 16,
              background: "#1DB954",
              boxShadow: "0px 0px 10px 0px gray",
            }}
          >
            <SpotifyLogo variant="white" height={24} />
          </div>
        </div>
      </div>
    </div>
  );
};
