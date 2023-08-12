import { useAtomValue, useAtom } from "jotai";
import {
  playlistInformationAtom,
  excludedPlaylistIdsAtom,
} from "../state/main";

export enum ExclusionState {
  NONE,
  SOME,
  ALL,
}

export const usePlaylistExclusion = (): {
  state: ExclusionState;
  excludeFollowed: () => void;
  includeAll: () => void;
} => {
  const playlists = useAtomValue(playlistInformationAtom);
  const [excludedPlaylistId, setExcludedPlaylistId] = useAtom(
    excludedPlaylistIdsAtom,
  );

  const followedPlaylists = Object.values(playlists).filter(
    ({ isOwn }) => !isOwn,
  );

  const allPublicToggledOff = followedPlaylists.every(({ id }) =>
    excludedPlaylistId.includes(id),
  );

  const exclude = () => {
    const foreignPlaylistsIds = followedPlaylists.map(({ id }) => id);
    setExcludedPlaylistId((cur) => [...cur, ...foreignPlaylistsIds]);
  };

  return {
    state:
      excludedPlaylistId.length === 0
        ? ExclusionState.NONE
        : allPublicToggledOff
        ? ExclusionState.ALL
        : ExclusionState.SOME,
    excludeFollowed: exclude,
    includeAll: () => setExcludedPlaylistId([]),
  };
};
