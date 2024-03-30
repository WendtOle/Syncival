import "./App.css";
import { Route, Routes } from "react-router-dom";
import { RouteEnum } from "../state/types";
import { useLineupFetch } from "../hooks/useLineupFetch";
import { useFetchPlaylists } from "../hooks/useFetchPlaylists";
import { InformationSnackbar } from "./InformationSnackbar";
import { ExcludePlaylistScreen } from "./ExludePlaylistScreen";
import { LinueupCreationScreen } from "./screens/LineupCreationScreen";
import { BottomSpotifyPlayer } from "./BottomSpotifyPlayer";
import { LinupSelectionScreen } from "./screens/LineupSelectionScreen";
import { useFetchSnapshot } from "../hooks/useFetchSnapshot";
import { useFetchArtists } from "../hooks/useFetchArtists";
import { ArtistList } from "./ArtistList";

export const App = () => {
  useLineupFetch();
  useFetchPlaylists();
  useFetchSnapshot();
  useFetchArtists();
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ maxWidth: 800, width: "100%" }}>
        <Routes>
          <Route
            path={RouteEnum.LINEUP_SELECTION}
            element={<LinupSelectionScreen />}
          />
          <Route path={RouteEnum.ARTISTS} element={<ArtistList />} />
          <Route path={RouteEnum.EXCLUDE} element={<ExcludePlaylistScreen />} />
          <Route
            path={RouteEnum.NEW_LINEUP}
            element={<LinueupCreationScreen />}
          />
        </Routes>
        <BottomSpotifyPlayer />
        <InformationSnackbar />
      </div>
    </div>
  );
};
