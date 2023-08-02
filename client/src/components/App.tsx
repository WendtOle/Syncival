import { Playlists } from "./Playlists";
import { ArtistResult } from "./ArtistResult";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Playlist } from "./SinglePlaylistV2";
import { DataLoading } from "./DataLoading";
import { AppBar } from "./AppBar";
import { RouteEnum } from "../state/types";

export const App = () => {
  return (
    <>
      <AppBar />
      <Routes>
        <Route path={RouteEnum.LOADING} element={<DataLoading />} />
        <Route path={RouteEnum.PLAYLIST_LIST} element={<Playlists />} />
        <Route path={RouteEnum.PLAYLIST} element={<Playlist />} />
        <Route path={RouteEnum.ARTISTS} element={<ArtistResult />} />
      </Routes>
    </>
  );
};
