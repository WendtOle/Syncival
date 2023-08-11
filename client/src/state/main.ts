import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { ArtistV3, Playlist, PlaylistInformation, Track } from "./types";
import { lineupsAtom } from "./lineups";

export const playlistInformationAtom = atomWithStorage<
  Record<string, PlaylistInformation>
>("playlists", {});

export const playlistSnapShotAtom = atomWithStorage<Record<string, Track[]>>(
  "snapshots",
  {},
);

export const lineupPlaylistIdsAtom = atom<Record<string, string[]>>((get) => {
  const lineups = get(lineupsAtom);
  const playlistInformation = get(playlistInformationAtom);
  const lineupKeys = Object.values(lineups).map(({ key }) => key);
  return lineupKeys.reduce(
    (prev, key) => {
      const playlistsWithLineupKey = Object.values(playlistInformation).filter(
        ({ name }) => name.includes(key),
      );
      return { ...prev, [key]: playlistsWithLineupKey.map(({ id }) => id) };
    },
    {} as Record<string, string[]>,
  );
});

export const playlistAtom = atom<Record<string, Playlist>>((get) => {
  const playlistInformation = get(playlistInformationAtom);
  const fromAppCreatedPlaylists = Object.values(
    get(lineupPlaylistIdsAtom),
  ).flat();
  const playlistSnapshots = get(playlistSnapShotAtom);
  return Object.entries(playlistInformation).reduce(
    (prev, [id, playlist]) => {
      if (fromAppCreatedPlaylists.includes(id)) {
        return prev;
      }
      const snapShotId = playlist.snapShotId;
      const snapshot = playlistSnapshots[snapShotId] ?? [];
      return {
        ...prev,
        [id]: {
          ...playlist,
          tracks: snapshot,
        },
      };
    },
    {} as Record<string, Playlist>,
  );
});
export const excludedPlaylistIdsAtom = atom<string[]>([]);

export const filteredPlaylistAmountAtom = atom<number>((get) => {
  const filteredPlaylists = Object.keys(get(playlistAtom)).filter(
    (id) => !get(excludedPlaylistIdsAtom).includes(id),
  );
  return filteredPlaylists.length;
});

export const artistsAtom = atom<Record<string, ArtistV3>>((get) => {
  const tracks = Object.values(get(playlistAtom))
    .map(({ tracks }) => tracks)
    .flat();

  const artists = tracks.reduce(
    (prev, track) => {
      track.artists.forEach((artist) => {
        if (prev[artist.id]) {
          if (!prev[artist.id].tracks.includes(track.id)) {
            prev[artist.id].tracks.push(track.id);
          }
        } else {
          prev[artist.id] = {
            id: artist.id,
            name: artist.name,
            tracks: [track.id],
          };
        }
      });
      return prev;
    },
    {} as Record<string, ArtistV3>,
  );
  return artists;
});

export const tracksAtom = atom<Record<string, Track>>((get) => {
  const tracks = Object.values(get(playlistAtom))
    .map(({ tracks }) => tracks)
    .flat();
  return tracks.reduce(
    (prev, track) => {
      prev[track.id] = track;
      return prev;
    },
    {} as Record<string, Track>,
  );
});

export const filteredArtistsAtom = atom<ArtistV3[]>((get) => {
  const preprocessed = get(lineupAtom).map((artist) => artist.toLowerCase());
  return Object.values(get(artistsAtom)).filter(({ name }) =>
    preprocessed.includes(name.toLocaleLowerCase()),
  );
});

export const matchedSongsAtom = atom<string[]>((get) => {
  const tracks = new Set(
    get(filteredArtistsAtom)
      .map(({ tracks }) => tracks)
      .flat(),
  );
  return [...tracks];
});

export const matchedSongsByPlaylistAtom = atom<Record<string, string[]>>(
  (get) => {
    const matchedSongs = get(matchedSongsAtom);
    return Object.entries(get(playlistAtom)).reduce(
      (prev, [id, { tracks }]) => {
        const filteredTracks = tracks
          .map(({ id }) => id)
          .filter((id) => matchedSongs.includes(id));
        if (filteredTracks.length === 0) {
          return prev;
        }
        return { ...prev, [id]: filteredTracks };
      },
      {} as Record<string, string[]>,
    );
  },
);

export const matchedSongsByArtistAtom = atom<Record<string, string[]>>(
  (get) => {
    const matchedSongs = get(matchedSongsAtom);
    return Object.entries(get(artistsAtom)).reduce(
      (prev, [id, { tracks }]) => {
        const filteredTracks = tracks.filter((id) => matchedSongs.includes(id));
        if (filteredTracks.length === 0) {
          return prev;
        }
        return { ...prev, [id]: filteredTracks };
      },
      {} as Record<string, string[]>,
    );
  },
);

export const selectedLineupKeyAtom = atomWithStorage<string | null>(
  "selectedLineup",
  null,
);

export const lineupAtom = atom<string[]>((get) => {
  const lineupId = get(selectedLineupKeyAtom);
  if (!lineupId) {
    return [];
  }
  return (
    get(lineupsAtom).find((entry) => entry.key === lineupId)?.artists ?? []
  );
});
export const focusedAtom = atom<{
  id: string;
  type: "artist" | "playlist";
} | null>(null);

export const playlistTabExpandedAtom = atomWithStorage<
  "own" | "followed" | null
>("expanded", "own");

export const informationToastAtom = atom<string | null>(null);
