import "./App.css";
import { Route, Routes } from "react-router-dom";
import { FestivalScreen } from "./FestivalScreen";
import { FestivalSelectionScreen } from "./FestivalSelectionScreen";
import { useAuthentication } from "../hooks/useAuthentication";

export const App = () => {
  useAuthentication();
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100vh" }}>
      <div style={{ maxWidth: 800, width: "100%", height: "100%" }}>
        <Routes>
          <Route path="/:festival" element={<FestivalScreen />} />
          <Route path="/" element={<FestivalSelectionScreen />} />
        </Routes>
      </div>
    </div>
  );
};
