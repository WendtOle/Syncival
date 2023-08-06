import { useAtomValue, useAtom } from "jotai";
import {
  playlistInformationAtom,
  excludedPlaylistIdsAtom,
} from "../state/main";

export enum CheckboxState {
  OFF,
  INTERMEDIATE,
  ON,
}

export const useToggleFollowedPlaylists = (): {
  state: CheckboxState;
  toggle: () => void;
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

  const allPublicToggledOn = followedPlaylists.every(
    ({ id }) => !excludedPlaylistId.includes(id),
  );

  const togglePublic = () => {
    const foreignPlaylistsIds = followedPlaylists.map(({ id }) => id);
    if (foreignPlaylistsIds.every((id) => excludedPlaylistId.includes(id))) {
      setExcludedPlaylistId((cur) =>
        cur.filter((id) => !foreignPlaylistsIds.includes(id)),
      );
      return;
    }
    setExcludedPlaylistId((cur) => [...cur, ...foreignPlaylistsIds]);
  };

  return {
    state: allPublicToggledOff
      ? CheckboxState.OFF
      : allPublicToggledOn
      ? CheckboxState.ON
      : CheckboxState.INTERMEDIATE,
    toggle: togglePublic,
  };
};
