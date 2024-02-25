import { useAtom, useAtomValue } from "jotai";
import { getPlaylists } from "../provider/playlists";
import { accessTokenAtom } from "../state/auth";
import { PlaylistInformation, Track } from "../state/types";
import { playlistInformationAtom, playlistSnapShotAtom } from "../state/main";
import { useEffect } from "react";
import { getPlaylistTracks } from "../provider/songs";
import { toRecord } from "../util/toRecord";

export const LIKED_SONGS_PLAYLIST_ID = "liked_songs";
export const likedSongsPlaylist: PlaylistInformation = {
  name: "Liked Songs",
  id: LIKED_SONGS_PLAYLIST_ID,
  isOwn: true,
  snapShotId: "",
  snapShotDate: new Date(),
};

export const useFetchPlaylists = async () => {
  const accessToken = useAtomValue(accessTokenAtom);
  const [playlists, setPlaylists] = useAtom(playlistInformationAtom);
  const [snapShotIds, setSnapShotIds] = useAtom(playlistSnapShotAtom);

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    const something = async () => {
      const playlistInformation = await fetchPlaylistInformation(accessToken);

      setPlaylists((existingPlaylists) => {
        const filtered = Object.values(playlistInformation)
          .filter(({ id }) => {
            const matching = existingPlaylists[id];
            if (!matching) {
              return true;
            }
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayMillis = yesterday.getTime();
            const playlistTime = new Date(matching.snapShotDate).getTime();
            return matching.isOwn || playlistTime < yesterdayMillis;
          })
          .map((playlist) => ({ ...playlist, snapShotDate: new Date() }));

        const newPlaylists = toRecord(filtered, ({ id }) => id);

        return {
          ...existingPlaylists,
          [LIKED_SONGS_PLAYLIST_ID]: likedSongsPlaylist,
          ...newPlaylists,
        };
      });
    };
    something();
  }, [accessToken, setPlaylists]);

  useEffect(() => {
    if (Object.keys(playlists).length === 0) {
      return;
    }
    const something = async () => {
      const updatedSnapShotIds = Object.values(playlists).map(
        ({ id, snapShotId }) => [id, snapShotId],
      );
      const snapShotIdsToFetch = updatedSnapShotIds.filter(
        ([, snapShotId]) => !Object.keys(snapShotIds).includes(snapShotId),
      );
      snapShotIdsToFetch.forEach(([, snapShotId]) =>
        setSnapShotIds((cur) => ({ ...cur, [snapShotId]: [] })),
      );

      for (const [id, snapShotId] of snapShotIdsToFetch) {
        const songs = await fetchPlaylistSongs(accessToken, id);
        setSnapShotIds((cur) => ({ ...cur, [snapShotId]: songs }));
      }
    };
    something();
  }, [playlists]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (
      Object.keys(playlists).length === 0 ||
      Object.keys(snapShotIds).length === 0
    ) {
      return;
    }

    const usedSnapShotIds = Object.values(playlists).map(
      ({ snapShotId }) => snapShotId,
    );

    setSnapShotIds((cur) => {
      return Object.entries(cur).reduce(
        (acc, [snapShotId, songs]) => {
          if (usedSnapShotIds.includes(snapShotId)) {
            return { ...acc, [snapShotId]: songs };
          }
          return acc;
        },
        {} as Record<string, Track[]>,
      );
    });
  }, [playlists]); //eslint-disable-line react-hooks/exhaustive-deps
};

const fetchPlaylistInformation = async (
  accessToken: () => string,
  fetchedPlaylists: Record<string, PlaylistInformation> = {},
  nextPage = 0,
): Promise<Record<string, PlaylistInformation>> => {
  const newPlaylists = await getPlaylists(accessToken(), nextPage);
  if (Object.keys(newPlaylists).length === 0) {
    return fetchedPlaylists;
  }

  const playlists: Record<string, PlaylistInformation> = {
    ...fetchedPlaylists,
    ...toRecord(
      Object.values(newPlaylists).filter(
        ({ id }) => fetchedPlaylists[id] === undefined,
      ),
      ({ id }) => id,
    ),
  };
  return await fetchPlaylistInformation(accessToken, playlists, nextPage + 1);
};

const fetchPlaylistSongs = async (
  accessToken: () => string,
  playlistId: string,
  fetchedSongs: Track[] = [],
  nextPage = 0,
): Promise<Track[]> => {
  const newSongs = await getPlaylistTracks(accessToken(), nextPage, playlistId);
  const allNewSongsAlreadyPresent = newSongs.every(({ id: newSongId }) =>
    fetchedSongs.find(({ id: fetchedSongId }) => newSongId === fetchedSongId),
  );
  if (newSongs.length === 0 || allNewSongsAlreadyPresent) {
    return fetchedSongs;
  }

  return await fetchPlaylistSongs(
    accessToken,
    playlistId,
    [...fetchedSongs, ...newSongs],
    nextPage + 1,
  );
};
