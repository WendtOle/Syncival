import PersonIcon from "@mui/icons-material/Person";
import { Badge } from "@mui/material";
import { useAtomValue } from "jotai";
import { filteredArtistsAtom } from "../state/main";
export const ArtistNavigationIcon = () => {
  const filteredArtists = useAtomValue(filteredArtistsAtom);
  return (
    <Badge badgeContent={filteredArtists.length} color="info">
      <PersonIcon />
    </Badge>
  );
};
