import { useAtom, useAtomValue } from "jotai";
import {
  playlistsFetchedStateAtom,
  snapshotFetchedStateAtom,
} from "../state/fetch";
import { useEffect } from "react";
import { playlistInformationAtom, playlistSnapShotAtom } from "../state/main";
import { accessTokenAtom } from "../state/auth";
import { fetchSnapshots } from "./fetchSnapshots";

export const useFetchSnapshot = () => {
  const playlistFetchState = useAtomValue(playlistsFetchedStateAtom);
  const [snapshotFetchState, setSnapshotFetchState] = useAtom(
    snapshotFetchedStateAtom
  );
  const [snapshots, setSnapshots] = useAtom(playlistSnapShotAtom);
  const playlistInfo = useAtomValue(playlistInformationAtom);
  const accessToken = useAtomValue(accessTokenAtom);

  useEffect(() => {
    if (
      playlistFetchState !== "fetched" ||
      snapshotFetchState !== "not-fetched"
    ) {
      return;
    }
    const fetch = async () => {
      setSnapshotFetchState("fetching");

      const updatedSnapshots = await fetchSnapshots({
        existingSnapshots: snapshots,
        accessToken,
        playlistInfo,
      });

      setSnapshots(updatedSnapshots);

      setSnapshotFetchState("fetched");
    };
    fetch();
  });
};
