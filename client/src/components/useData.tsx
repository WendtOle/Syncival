import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { getPlaylists } from "../provider/playlists";
import { getPlaylistTracks } from "../provider/songs";
import { accessTokenAtom } from "../state/auth";
import {
  likedSongsPlaylist,
  playlistsAtom,
  playlistSongsAtom,
} from "../state/main";
import { useEffect, useState } from "react";
import { getData } from "../provider/data";
import { dataAtom } from "../state/data";

export enum Types {
  PLAYLIST,
  SONG,
  LINEUP,
}

interface Entry {
  finished?: boolean;
  loading?: boolean;
  count: number;
}

const initialValue = {
  [Types.PLAYLIST]: { count: 0 },
  [Types.SONG]: { count: 0 },
  [Types.LINEUP]: { count: 0 },
};

export const useData = (): {
  infos: Record<Types, Entry>;
  loadData: () => Promise<void>;
  clear: () => void;
} => {
  const [playlists, setPlaylists] = useAtom(playlistsAtom);
  const [data, setData] = useAtom(dataAtom);
  const setPlaylistSongs = useSetAtom(playlistSongsAtom);
  const accessToken = useAtomValue(accessTokenAtom);
  const [infos, setInfos] = useState<Record<Types, Entry>>(initialValue);

  useEffect(() => {
    setInfos((cur) => ({
      [Types.PLAYLIST]: { ...cur[Types.PLAYLIST], count: playlists.length },
      [Types.SONG]: {
        ...cur[Types.SONG],
        count: playlists.filter(({ fetched }) => fetched).length,
      },
      [Types.LINEUP]: { ...cur[Types.LINEUP], count: Object.keys(data).length },
    }));
  }, [playlists, data]);

  const clear = () => {
    setPlaylists([likedSongsPlaylist]);
    setPlaylistSongs({});
    setData([]);
  };

  const loadData = async () => {
    setInfos(initialValue);
    setInfos((infos) => ({
      ...infos,
      [Types.PLAYLIST]: { ...infos[Types.PLAYLIST], loading: true },
    }));
    await fetchAllPlaylists();
    setInfos((infos) => ({
      ...infos,
      [Types.PLAYLIST]: {
        ...infos[Types.PLAYLIST],
        finished: true,
        loading: false,
      },
    }));
    setInfos((infos) => ({
      ...infos,
      [Types.SONG]: { ...infos[Types.SONG], loading: true },
    }));
    await fetchAllSongsOfAllPlaylists();
    setInfos((infos) => ({
      ...infos,
      [Types.SONG]: { ...infos[Types.SONG], finished: true, loading: false },
    }));
    setInfos((infos) => ({
      ...infos,
      [Types.LINEUP]: { count: Object.values(data).length, loading: true },
    }));
    const fetchedData = await getData();
    setData(fetchedData);
    setInfos((infos) => ({
      ...infos,
      [Types.LINEUP]: {
        count: Object.values(data).length,
        finished: true,
        loading: false,
      },
    }));
  };

  const fetchAllPlaylists = async (nextPage = 0) => {
    const playlists = await getPlaylists(accessToken(), nextPage);
    if (playlists.length === 0) {
      return;
    }
    setPlaylists((curPlaylists) => [
      ...curPlaylists,
      ...playlists.filter(
        ({ id }) => !curPlaylists.some((playlist) => playlist.id === id),
      ),
    ]);
    await fetchAllPlaylists(nextPage + 1);
  };

  const getUpdatedPlaylists = () => playlists;

  const fetchAllSongsOfAllPlaylists = async () => {
    const fetchAllSongs = async (playlistId: string, nextPage = 0) => {
      const songs = await getPlaylistTracks(
        accessToken(),
        nextPage,
        playlistId,
      );
      if (songs.length === 0) {
        return;
      }
      setPlaylistSongs((playlistSongs) => {
        const songsToAdd = songs.filter(
          ({ id }) =>
            !(playlistSongs[playlistId] ?? []).some((song) => song.id === id),
        );
        return {
          ...playlistSongs,
          [playlistId]: [...(playlistSongs[playlistId] ?? []), ...songsToAdd],
        };
      });
      await fetchAllSongs(playlistId, nextPage + 1);
    };

    const innerPlaylists = getUpdatedPlaylists();
    const playlistsToFetch = innerPlaylists.filter(({ fetched }) => !fetched);
    for (let i = 0; i < playlistsToFetch.length; ) {
      const { id } = playlistsToFetch[i];
      await fetchAllSongs(id);
      setPlaylists((cur) =>
        cur.map((curPlaylist) =>
          curPlaylist.id === id
            ? { ...curPlaylist, fetched: new Date() }
            : curPlaylist,
        ),
      );
      i++;
    }
  };

  return { infos, loadData, clear };
};
