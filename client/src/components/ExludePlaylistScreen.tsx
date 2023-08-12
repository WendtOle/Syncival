import { useExcludedInfo } from "../hooks/useExcludedInfo";
import { AppBar } from "./AppBar";
import { Playlists } from "./Playlists";
import { ExcludedPlaylistDialog } from "./ExcludedPlaylistDialog";
import { ExcludeMenu } from "../hooks/ExcludeMenu";

export const ExcludePlaylistScreen = () => {
  const { playlists } = useExcludedInfo();
  return (
    <>
      <AppBar
        title={
          playlists > 0
            ? `${playlists} playlists excluded`
            : "Exclude playlists"
        }
        showBackButton
      >
        <ExcludedPlaylistDialog />
        <ExcludeMenu />
      </AppBar>
      <Playlists />
    </>
  );
};
