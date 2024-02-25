import { PlaylistInformation, Track } from "../state/types";
import { getPlaylistTracks } from "../provider/songs";

interface FetchSnapshotProps {
  existingSnapshots: Record<string, Track[]>;
  playlistInfo: Record<string, PlaylistInformation>;
  accessToken: () => string;
}

export const fetchSnapshots = async ({
  existingSnapshots,
  accessToken,
  playlistInfo,
}: FetchSnapshotProps) => {
  const existingSnapshotIds = Object.keys(existingSnapshots);
  type someType = [string[], PlaylistInformation[]];
  const init: someType = [[], []];
  const [toKeep, toFetch] = Object.values(playlistInfo).reduce(
    ([toKeep, toFetch], curr): someType => {
      const snapShotExists = existingSnapshotIds.includes(curr.snapShotId);
      if (snapShotExists) {
        return [[...toKeep, curr.snapShotId], toFetch];
      } else {
        return [toKeep, [...toFetch, curr]];
      }
    },
    init
  );

  console.log({
    total: Object.values(playlistInfo).length,
    toFetch: toFetch.length,
    toKeep: toKeep.length,
  });

  console.log("toFetch", toFetch.map(({ name }) => name).join(", "));

  const newSnapshots = await Promise.all(
    toFetch.map(async ({ snapShotId, id }) => {
      const response = await fetchPlaylistSongs(accessToken, id);
      return [snapShotId, response] as const;
    })
  );
  return [
    ...toKeep.map(
      (snapshotId) => [snapshotId, existingSnapshots[snapshotId]] as const
    ),
    ...newSnapshots,
  ].reduce(
    (acc, [snapshotId, tracks]) => ({ ...acc, [snapshotId]: tracks }),
    {}
  );
};

const fetchPlaylistSongs = async (
  accessToken: () => string,
  snapshotId: string,
  fetchedSongs: Track[] = [],
  nextPage = 0
): Promise<Track[]> => {
  const newSongs = await getPlaylistTracks(accessToken(), nextPage, snapshotId);
  const allNewSongsAlreadyPresent = newSongs.every(({ id: newSongId }) =>
    fetchedSongs.find(({ id: fetchedSongId }) => newSongId === fetchedSongId)
  );
  if (newSongs.length === 0 || allNewSongsAlreadyPresent) {
    return fetchedSongs;
  }

  return await fetchPlaylistSongs(
    accessToken,
    snapshotId,
    [...fetchedSongs, ...newSongs],
    nextPage + 1
  );
};
