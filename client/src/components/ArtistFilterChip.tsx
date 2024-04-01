import { Chip } from "@mui/material";
import { useAtom } from "jotai";
import { ArtistFilter, artistsFilterAtom } from "../state/ui";
import { CheckIcon } from "./Icons";

interface ArtistFilterChipProps {
  label: string;
  filterValue: ArtistFilter;
  showIf: ArtistFilter[];
  showAsSelectedIf?: ArtistFilter[];
  filterValueAfterUnselect?: ArtistFilter;
}

export const ArtistFilterChip = ({
  label,
  filterValue,
  showIf,
  showAsSelectedIf,
  filterValueAfterUnselect,
}: ArtistFilterChipProps) => {
  const [artistFilter, setArtistFilter] = useAtom(artistsFilterAtom);
  const selected = [...(showAsSelectedIf ?? []), filterValue].includes(
    artistFilter
  );
  if (![...showIf, filterValue].includes(artistFilter)) return null;
  return (
    <Chip
      label={label}
      variant={selected ? "filled" : "outlined"}
      icon={selected ? <CheckIcon fontSize="small" /> : undefined}
      sx={{
        borderRadius: "8px",
        border: selected ? "1px solid transparent" : undefined,
        height: "32px",
        marginRight: "8px",
      }}
      onClick={() =>
        setArtistFilter((prev) =>
          prev === filterValue ? filterValueAfterUnselect ?? "all" : filterValue
        )
      }
    />
  );
};
