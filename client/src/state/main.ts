import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { ArtistV2, PlaylistInformation, Track } from "./types";
import { lineupsAtom } from "./lineups";

export const LIKED_SONGS_PLAYLIST_ID = "liked_songs";
export const likedSongsPlaylist: PlaylistInformation = {
  name: "Liked Songs",
  id: LIKED_SONGS_PLAYLIST_ID,
  isOwn: true,
  snapShotId: "",
};

export const playlistInformationAtom = atomWithStorage<
  Record<string, PlaylistInformation>
>("playlists", { [likedSongsPlaylist.id]: likedSongsPlaylist });
export const playlistSongsAtom = atomWithStorage<Record<string, Track[]>>(
  "songs",
  {},
);
export const excludedPlaylistIdsAtom = atom<string[]>([]);
export const filteredArtistsAtom = atom<ArtistV2[]>((get) => {
  const filteredPlaylists = Object.entries(get(playlistInformationAtom))
    .filter(([id]) => !get(excludedPlaylistIdsAtom).includes(id))
    .map(([, playlist]) => playlist);
  const filteredTracks = filteredPlaylists
    .map(({ id }) => get(playlistSongsAtom)[id] ?? [])
    .flat();

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

  const preprocessed = get(lineupsAtom).map((artist) =>
    artist.name.toLowerCase(),
  );
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

export const initialInfoDismissedAtom = atomWithStorage<boolean>(
  "initialInfoDismissed",
  false,
);
