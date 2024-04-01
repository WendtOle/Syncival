import { useAtom } from "jotai";
import { artistsFilterAtom } from "../state/ui";
import Chip from "@mui/material/Chip";
import { CheckIcon } from "./Icons";
import { ArtistFilterChip } from "./ArtistFilterChip";

export const ArtistFilter = () => {
  const [artistFilter, setArtistFilter] = useAtom(artistsFilterAtom);
  return (
    <div style={{ marginBottom: 8, marginLeft: 16 }}>
      <ArtistFilterChip
        label="Spotify"
        filterValue="spotify"
        hideIf="nonSpotify"
      />
      <ArtistFilterChip
        label="Not on Spotify"
        filterValue="nonSpotify"
        hideIf="spotify"
      />
    </div>
  );
};
