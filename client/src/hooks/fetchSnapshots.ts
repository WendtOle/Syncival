import { PlaylistInformation, Track } from "../state/types";
import { getPlaylistTracks } from "../provider/songs";

interface FetchSnapshotProps {
  existingSnapshots: Record<string, Track[]>;
  playlistInfo: Record<string, PlaylistInformation>;
  accessToken: () => string;
  addSnapshot: (newSnapShot: Record<string, Track[]>) => void;
  removeSnapshots: (ids: string[]) => void;
}

export const fetchSnapshots = async ({
  existingSnapshots,
  accessToken,
  playlistInfo,
  addSnapshot,
  removeSnapshots,
}: FetchSnapshotProps) => {
  const existingSnapshotIds = Object.keys(existingSnapshots);
  const toFetch = Object.values(playlistInfo).filter(
    ({ snapShotId }) => !existingSnapshotIds.includes(snapShotId)
  );

  console.log({
    total: Object.values(playlistInfo).length,
    toFetch: toFetch.length,
  });

  console.log("toFetch", toFetch.map(({ name }) => name).join(", "));

  toFetch.forEach(async ({ snapShotId, id }) => {
    const response = await fetchPlaylistSongs(accessToken, id);
    addSnapshot({ [snapShotId]: response });
  });

  const snapShotsIdsToKeep = Object.values(playlistInfo).map(
    ({ snapShotId }) => snapShotId
  );
  const toDelete = existingSnapshotIds.filter(
    (id) => !snapShotsIdsToKeep.includes(id)
  );
  console.log("toDelete", toDelete);
  removeSnapshots(toDelete);
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
