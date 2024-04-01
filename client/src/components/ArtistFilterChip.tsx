import { Chip } from "@mui/material";
import { useAtom } from "jotai";
import { ArtistFilter, artistsFilterAtom } from "../state/ui";
import { CheckIcon } from "./Icons";

interface ArtistFilterChipProps {
  label: string;
  filterValue: ArtistFilter;
  hideIf: ArtistFilter;
}

export const ArtistFilterChip = ({
  label,
  filterValue,
  hideIf,
}: ArtistFilterChipProps) => {
  const [artistFilter, setArtistFilter] = useAtom(artistsFilterAtom);
  if (artistFilter === hideIf) return null;
  return (
    <Chip
      label={label}
      variant={artistFilter === filterValue ? "filled" : "outlined"}
      icon={
        artistFilter === filterValue ? (
          <CheckIcon fontSize="small" />
        ) : undefined
      }
      sx={{
        borderRadius: "8px",
        border:
          artistFilter === filterValue ? "1px solid transparent" : undefined,
        height: "32px",
        marginRight: "8px",
      }}
      onClick={() =>
        setArtistFilter((prev) => (prev === filterValue ? "all" : filterValue))
      }
    />
  );
};
