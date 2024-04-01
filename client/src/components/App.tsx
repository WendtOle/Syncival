import "./App.css";
import { Route, Routes } from "react-router-dom";
import { InformationSnackbar } from "./InformationSnackbar";
import { BottomSpotifyPlayer } from "./BottomSpotifyPlayer";
import { FestivalScreen } from "./screens/FestivalScreen";
import { FestivalSelectionScreen } from "./screens/FestivalSelectionScreen";

export const App = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100vh" }}>
      <div style={{ maxWidth: 800, width: "100%", height: "100%" }}>
        <Routes>
          <Route path="/:festival" element={<FestivalScreen />} />
          <Route path="/" element={<FestivalSelectionScreen />} />
        </Routes>
        <BottomSpotifyPlayer />
        <InformationSnackbar />
      </div>
    </div>
  );
};
