import { useAtomValue } from "jotai";
import { AppBar } from "./AppBar";
import { SortOption, sortAtom } from "../state/ui";
import { SongsList } from "./SongsList";
import { GroupedSongs } from "./GroupedSongs";
import { SongsGroupedByArtist } from "./SongsGroupedByArtist";
import { SortMenu } from "./SortMenu";
import { AppBarMenu } from "./AppBarMenu";
import { useLineups } from "../hooks/useLineups";
import { ExlusionSnackbar } from "./ExlusionSnackbar";

export const ArtistResult = () => {
  const { selected } = useLineups();
  const sort = useAtomValue(sortAtom);
  return (
    <>
      <AppBar title={selected?.name ?? "No lineup selected"}>
        <SortMenu />
        <AppBarMenu />
      </AppBar>
      <div>
        {sort === SortOption.DEFAULT && <SongsList />}
        {sort === SortOption.ARTISTS && <SongsGroupedByArtist />}
        {sort === SortOption.PLAYLISTS && <GroupedSongs />}
      </div>
      <ExlusionSnackbar />
    </>
  );
};
