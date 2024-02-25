import { useAtom, useAtomValue } from "jotai";
import {
  playlistsFetchedStateAtom,
  snapshotFetchedStateAtom,
} from "../state/fetch";
import { useEffect } from "react";
import { playlistInformationAtom, playlistSnapShotAtom } from "../state/main";
import { accessTokenAtom } from "../state/auth";
import { fetchSnapshots } from "./fetchSnapshots";
import { Track } from "../state/types";

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

      const addSnapshot = (newSnapShots: Record<string, Track[]>) =>
        setSnapshots((prev) => ({ ...prev, ...newSnapShots }));
      const removeSnapshots = (ids: string[]) =>
        setSnapshots((prev) => {
          const updated = { ...prev };
          ids.forEach((id) => delete updated[id]);
          return updated;
        });
      await fetchSnapshots({
        existingSnapshots: snapshots,
        accessToken,
        playlistInfo,
        addSnapshot,
        removeSnapshots,
      });

      setSnapshotFetchState("fetched");
    };
    fetch();
  });
};
