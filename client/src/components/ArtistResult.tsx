import { useAtomValue } from "jotai";
import { AppBar } from "./AppBar";
import { SortOption, sortAtom } from "../state/ui";
import { SongsList } from "./SongsList";
import { GroupedSongs } from "./GroupedSongs";
import { SongsGroupedByArtist } from "./SongsGroupedByArtist";

export const ArtistResult = () => {
  const sort = useAtomValue(sortAtom);
  return (
    <>
      <AppBar />
      <div>
        {sort === SortOption.DEFAULT && <SongsList />}
        {sort === SortOption.ARTISTS && <SongsGroupedByArtist />}
        {sort === SortOption.PLAYLISTS && <GroupedSongs />}
      </div>
    </>
  );
};
