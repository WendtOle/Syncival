import { AppBar } from "./AppBar";
import { Playlists } from "./Playlists";

export const ExcludePlaylistScreen = () => {
  return (
    <>
      <AppBar title="Exclude playlists" showBackButton />
      <Playlists />
    </>
  );
};
