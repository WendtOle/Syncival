import { ArtistFilterChip } from "./ArtistFilterChip";
import {
  ArtistFilterOption,
  filterGroupMapping,
  filterNames,
  groupableFilterMapping,
} from "../types/filter";
import { useAtom } from "jotai";
import { useArtists } from "../hooks/useArtistsNew";
import { artistsFilterAtom } from "../state/ui";
import { getOnClick } from "../util/getOnClick";
import { filterStateMachine } from "../util/filterStateMachine";

export const ArtistFilter = () => {
  const [artistFilter, setArtistFilter] = useAtom(artistsFilterAtom);
  const result = useArtists();

  const key =
    typeof artistFilter === "object" ? artistFilter.filter : artistFilter;

  const additionalFilter =
    typeof artistFilter === "object"
      ? filterGroupMapping[artistFilter.filter].filter(
          (filter) => !artistFilter.items.includes(filter)
        )
      : [];

  const filterToShow = [
    ...filterStateMachine[key],
    ...additionalFilter.map((filter) => ({
      current: filter,
      append: groupableFilterMapping[filter],
    })),
  ]
    .filter((entry) => {
      return (
        !("append" in entry) ||
        (result !== undefined && result(entry.current).length > 0)
      );
    })
    .map((entry) => ({
      current: entry.current,
      onClick: getOnClick(entry, artistFilter, setArtistFilter),
      selected: "next" in entry && entry.current !== entry.next,
      label:
        typeof artistFilter === "object" &&
        artistFilter.filter === entry.current
          ? artistFilter.items.map((item) => filterNames[item]).join(" & ")
          : filterNames[entry.current as ArtistFilterOption],
    }))
    .sort(({ selected }) => (selected ? -1 : 1));

  return (
    <div style={{ marginBottom: 8, marginLeft: 16 }}>
      {filterToShow.map(({ current, onClick, selected, label }) => (
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
