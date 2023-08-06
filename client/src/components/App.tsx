import { ArtistResult } from "./ArtistResult";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AppBar } from "./AppBar";
import { RouteEnum } from "../state/types";
import { InfoDialog } from "./InfoDialog";
import { useLineupFetch } from "../hooks/useLineupFetch";

export const App = () => {
  useLineupFetch();
  return (
    <>
      <InfoDialog />
      <AppBar />
      <Routes>
        <Route path={RouteEnum.ARTISTS} element={<ArtistResult />} />
      </Routes>
    </>
  );
};
