import { useAtom, useAtomValue } from "jotai";
import { playlistsFetchedStateAtom } from "../state/fetch";
import { useEffect } from "react";
import { accessTokenAtom } from "../state/auth";
import { playlistInformationAtom } from "../state/main";
import { fetchPlaylists } from "./fetchPlaylists";

export const useFetchPlaylists = () => {
  const [playlistFetchState, setPlaylistFetchState] = useAtom(
    playlistsFetchedStateAtom,
  );
  const accessToken = useAtomValue(accessTokenAtom);
  const [playlists, setPlaylists] = useAtom(playlistInformationAtom);

  useEffect(() => {
    if (playlistFetchState !== "not-fetched") {
      return;
    }
    setPlaylistFetchState("fetching");

    const fetch = async () => {
      const updatedPlaylists = await fetchPlaylists({
        accessToken,
        existingPlaylists: playlists,
      });
      setPlaylists(updatedPlaylists);
      setPlaylistFetchState("fetched");
    };
    fetch();
  });
};
