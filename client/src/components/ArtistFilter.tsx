import { ArtistFilterChip } from "./ArtistFilterChip";
import { useFilters } from "../hooks/useFilters";

export const ArtistFilter = () => {
  const filter = useFilters();

  return (
    <div style={{ marginBottom: 8, marginLeft: 16 }}>
      {filter.map(({ current, onClick, selected, label }) => (
        <ArtistFilterChip
          key={current}
          label={label}
          onClick={onClick}
          selected={selected}
        />
      ))}
    </div>
  );
};
