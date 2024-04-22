import { Chip } from "@mui/material";
import { CheckIcon } from "./Icons";

interface ArtistFilterChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export const ArtistFilterChip = ({
  label,
  selected,
  onClick,
}: ArtistFilterChipProps) => {
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
      onClick={onClick}
    />
  );
};
