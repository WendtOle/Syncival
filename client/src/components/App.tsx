import { ArtistResult } from "./ArtistResult";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AppBar } from "./AppBar";
import { RouteEnum } from "../state/types";
import { useLineupFetch } from "../hooks/useLineupFetch";
import { useFetchPlaylists } from "../hooks/useFetchPlaylists";

export const App = () => {
  useLineupFetch();
  useFetchPlaylists();
  return (
    <>
      <AppBar />
      <Routes>
        <Route path={RouteEnum.ARTISTS} element={<ArtistResult />} />
      </Routes>
    </>
  );
};
