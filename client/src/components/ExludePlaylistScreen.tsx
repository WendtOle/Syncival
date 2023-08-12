import { useExcludedInfo } from "../hooks/useExcludedInfo";
import { AppBar } from "./AppBar";
import { Playlists } from "./Playlists";

export const ExcludePlaylistScreen = () => {
  const info = useExcludedInfo();
  return (
    <>
      <AppBar title={info} showBackButton />
      <Playlists />
    </>
  );
};
