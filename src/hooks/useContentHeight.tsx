import { useAtomValue } from "jotai";
import { appBarHeightAtom } from "../state/ui";

export const useContentHeight = () => {
  const appBarHeight = useAtomValue(appBarHeightAtom);
  return window.innerHeight - appBarHeight;
};
