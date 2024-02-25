import { getPlaylists } from "../provider/playlists";
import { PlaylistInformation } from "../state/types";
import { LIKED_SONGS_PLAYLIST_ID, likedSongsPlaylist } from "../util/constants";
import { toRecord as simpleToRecord } from "../util/toRecord";

interface FetchPlaylistsProps {
  accessToken: () => string;
  existingPlaylists: Record<string, PlaylistInformation>;
}

export const fetchPlaylists = async ({
  accessToken,
  existingPlaylists,
}: FetchPlaylistsProps): Promise<Record<string, PlaylistInformation>> => {
  const playlistInfo = await fetchPlaylistInformation({
    accessToken,
  });
  const altered = Object.values(playlistInfo)
    .map(updateSnapShotDate(existingPlaylists))
    .map((playlist) => [playlist.id, playlist] as const)
    .reduce(toRecord, {});
  return { ...altered, [LIKED_SONGS_PLAYLIST_ID]: likedSongsPlaylist };
};

const updateSnapShotDate =
  (cached: Record<string, PlaylistInformation>) =>
  (playlist: PlaylistInformation) => {
    const cachedPlaylist = cached[playlist.id];
    if (playlist.isOwn || !cachedPlaylist) {
      return { ...playlist, snapShotDate: new Date() };
    }
    const isCachedOlderThanOneDay =
      new Date(cachedPlaylist.snapShotDate).getTime() <
      new Date().getTime() - 86400000;

    if (!isCachedOlderThanOneDay) {
      return { ...playlist, snapShotDate: cachedPlaylist.snapShotDate };
    }
    return { ...playlist, snapShotDate: new Date() };
  };

const toRecord = <T, K extends string>(
  acc: Record<K, T>,
  [key, value]: readonly [K, T],
): Record<K, T> => ({ ...acc, [key]: value });

interface FetchPlaylistInformationProps {
  accessToken: () => string;
  fetchedPlaylists?: Record<string, PlaylistInformation>;
  nextPage?: number;
}

const fetchPlaylistInformation = async ({
  accessToken,
  fetchedPlaylists = {},
  nextPage = 0,
}: FetchPlaylistInformationProps): Promise<
  Record<string, PlaylistInformation>
> => {
  const newPlaylists = await getPlaylists(accessToken(), nextPage);
  if (Object.keys(newPlaylists).length === 0) {
    return fetchedPlaylists;
  }

  const playlists: Record<string, PlaylistInformation> = {
    ...fetchedPlaylists,
    ...simpleToRecord(
      Object.values(newPlaylists).filter(
        ({ id }) => fetchedPlaylists[id] === undefined,
      ),
      ({ id }) => id,
    ),
  };
  return await fetchPlaylistInformation({
    accessToken,
    fetchedPlaylists: playlists,
    nextPage: nextPage + 1,
  });
};
