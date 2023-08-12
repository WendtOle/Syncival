import { useAtom, useAtomValue } from "jotai";
import { dismissedExcludedPlaylistIdsAtom } from "../state/ui";
import { excludedPlaylistIdsAtom } from "../state/main";
import { useMemo } from "react";

export const useExcludedSnackbarOpen = () => {
  const excludedPlaylistIds = useAtomValue(excludedPlaylistIdsAtom);
  const [dismissedExcludedPlaylistIds, setDismissedExcludedPlaylistIds] =
    useAtom(dismissedExcludedPlaylistIdsAtom);
  const isOpen = useMemo(() => {
    if (excludedPlaylistIds.length === 0) {
      return false;
    }
    if (excludedPlaylistIds.length !== dismissedExcludedPlaylistIds.length) {
      return true;
    }
    for (let i = 0; i < excludedPlaylistIds.length; i++) {
      if (excludedPlaylistIds[i] !== dismissedExcludedPlaylistIds[i]) {
        return true;
      }
    }
    return false;
  }, [excludedPlaylistIds, dismissedExcludedPlaylistIds]);
  const close = () => {
    return setDismissedExcludedPlaylistIds(excludedPlaylistIds);
  };
  return { isOpen, close };
};
