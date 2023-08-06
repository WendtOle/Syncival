import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { ArtistV2, Playlist, PlaylistInformation, Track } from "./types";
import { lineupsAtom } from "./lineups";

export const playlistInformationAtom = atomWithStorage<
  Record<string, PlaylistInformation>
>("playlists", {});

export const playlistSnapShotAtom = atomWithStorage<Record<string, Track[]>>(
  "snapshots",
  {},
);
export const playlistAtom = atom<Record<string, Playlist>>((get) => {
  const playlistInformation = get(playlistInformationAtom);
  const playlistSnapshots = get(playlistSnapShotAtom);
  return Object.entries(playlistInformation).reduce(
    (prev, [id, playlist]) => {
      const snapShotId = playlist.snapShotId;
      const snapshot = playlistSnapshots[snapShotId] ?? [];
      prev[id] = {
        ...playlist,
        tracks: snapshot,
      };
      return prev;
    },
    {} as Record<string, Playlist>,
  );
});
export const excludedPlaylistIdsAtom = atom<string[]>([]);
export const filteredArtistsAtom = atom<ArtistV2[]>((get) => {
  const filteredPlaylists = Object.entries(get(playlistAtom))
    .filter(([id]) => !get(excludedPlaylistIdsAtom).includes(id))
    .map(([, playlist]) => playlist);

  const filteredTracks = filteredPlaylists.map(({ tracks }) => tracks).flat();

  const artists = Object.values(
    filteredTracks.reduce<Record<string, ArtistV2>>(
      (prev, { artists, id, name }) => {
        artists.forEach(({ id: artistId, name: artistName }) => {
          if (prev[artistId]) {
            if (!prev[artistId].tracks.find((track) => track.id === id)) {
              prev[artistId].tracks.push({ id, name, artists });
            }
          } else {
            prev[artistId] = {
              id: artistId,
              name: artistName,
              tracks: [{ id, name, artists }],
            };
          }
        });
        return prev;
      },
      {},
    ),
  );

  const preprocessed = get(lineupAtom).map((artist) => artist.toLowerCase());

  return artists.filter(({ name }) =>
    preprocessed.includes(name.toLocaleLowerCase()),
  );
});
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
