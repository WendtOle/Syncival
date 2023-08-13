import { useAtomValue } from "jotai";
import { AppBar } from "./AppBar";
import { SortOption, sortAtom } from "../state/ui";
import { SongsList } from "./SongsList";
import { GroupedSongs } from "./GroupedSongs";
import { SongsGroupedByArtist } from "./SongsGroupedByArtist";
import { SortMenu } from "./SortMenu";
import { AppBarMenu } from "./AppBarMenu";
import { useLineups } from "../hooks/useLineups";
import { ExcludeIcon } from "./Icons";
import { Badge, IconButton } from "@mui/material";
import { useExcludedInfo } from "../hooks/useExcludedInfo";
import { useNavigate } from "react-router-dom";
import { RouteEnum } from "../state/types";

export const ArtistResult = () => {
  const { selected } = useLineups();
  const sort = useAtomValue(sortAtom);
  const { playlists: excludedPlaylists } = useExcludedInfo();
  const navigate = useNavigate();
  return (
    <>
      <AppBar title={selected?.name ?? "No lineup selected"}>
        <SortMenu />
        {excludedPlaylists > 0 && (
          <IconButton
            color="inherit"
            onClick={() => navigate(RouteEnum.EXCLUDE)}
          >
            <Badge color="secondary" badgeContent={excludedPlaylists}>
              <ExcludeIcon />
            </Badge>
          </IconButton>
        )}
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
