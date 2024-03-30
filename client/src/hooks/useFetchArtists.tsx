import { useAtom, useAtomValue } from "jotai";
import {
  artistFetchedStateAtom,
  playlistsFetchedStateAtom,
  snapshotFetchedStateAtom,
} from "../state/fetch";
import { useEffect } from "react";
import { artistSnapshotsAtom } from "../state/main";
import { accessTokenAtom } from "../state/auth";
import { LimitedArtist } from "../state/types";
import { getArtistInfos } from "../provider/getArtistInfos";
import { useFilteredArtists } from "./useFilteredArtists";

export const useFetchArtists = () => {
  const playlistFetchState = useAtomValue(playlistsFetchedStateAtom);
  const snapshotFetchState = useAtomValue(snapshotFetchedStateAtom);
  const [artistFetchState, setArtistFetchState] = useAtom(
    artistFetchedStateAtom
  );

  const artists = useFilteredArtists();
  const accessToken = useAtomValue(accessTokenAtom);
  const [persistedArtists, setPersistedArtists] = useAtom(artistSnapshotsAtom);

  useEffect(() => {
    if (
      playlistFetchState !== "fetched" ||
      snapshotFetchState !== "fetched" ||
      artistFetchState !== "not-fetched"
    ) {
      return;
    }
    const fetch = async () => {
      console.warn(
        "currently with every reload only the first 50 artists are fetched"
      );
      setArtistFetchState("not-fetched");

      const artistIdsToQuery = Object.values(artists)
        .map((artist) => artist.id)
        .filter((artistId) => !persistedArtists[artistId])
        .slice(0, 50);

      if (artistIdsToQuery.length === 0) {
        setArtistFetchState("fetched");
        return;
      }

      const artistInfo = await getArtistInfos(accessToken(), artistIdsToQuery);
      setPersistedArtists({
        ...persistedArtists,
        ...artistInfo.reduce(
          (acc, artist) => ({ ...acc, [artist.id]: artist }),
          {} as Record<string, LimitedArtist>
        ),
      });

      setArtistFetchState("fetched");
    };
    fetch();
  });
};
