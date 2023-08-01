import LineupIcon from "@mui/icons-material/FormatListBulleted";
import { Badge } from "@mui/material";
import { useAtomValue } from "jotai";
import { lineupAtom } from "../state/main";

export const LineupNavigationIcon = () => {
  const lineupArtists = useAtomValue(lineupAtom);
  return (
    <Badge badgeContent={lineupArtists.length} color="info" max={10000}>
      <LineupIcon />
    </Badge>
  );
};
