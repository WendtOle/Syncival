import { ArtistResult } from "./ArtistResult";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Playlist } from "./SinglePlaylistV2";
import { AppBar } from "./AppBar";
import { RouteEnum } from "../state/types";
import { InfoDialog } from "./InfoDialog";

export const App = () => {
  return (
    <>
      <InfoDialog />
      <AppBar />
      <Routes>
        <Route path={RouteEnum.PLAYLIST} element={<Playlist />} />
        <Route path={RouteEnum.ARTISTS} element={<ArtistResult />} />
      </Routes>
    </>
  );
};
