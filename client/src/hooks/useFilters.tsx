import { useAtom } from "jotai";
import { artistsFilterAtom } from "../state/ui";
import {
  filterGroupMapping,
  groupableFilterMapping,
  filterNames,
  ArtistFilterOption,
  FilterGroupOption,
  GroupableFilterOption,
  OrFilterProps,
} from "../types/filter";
import { filterStateMachine } from "../util/filterStateMachine";
import { getOnClick } from "../util/getOnClick";
import { useArtists } from "./useArtistsNew";

type UseFiltersReturnValue = Array<{
  current: ArtistFilterOption | FilterGroupOption | GroupableFilterOption;
  onClick: () => void;
  selected: boolean;
  label: string;
}>;

export const useFilters = (): UseFiltersReturnValue => {
  const [artistFilter, setArtistFilter] = useAtom(artistsFilterAtom);
  const result = useArtists();

  const additionalFilter: OrFilterProps[] = (
    typeof artistFilter === "object"
      ? filterGroupMapping[artistFilter.filter].filter(
          (filter) => !artistFilter.items.includes(filter)
        )
      : []
  ).map((filter) => ({
    current: filter,
    append: groupableFilterMapping[filter],
  }));

  const state =
    typeof artistFilter === "object" ? artistFilter.filter : artistFilter;

  const filterOptions = [...filterStateMachine[state], ...additionalFilter];

  const filter = filterOptions
    .filter((entry) => {
      return (
        !("append" in entry) ||
        (result !== undefined && result(entry.current).length > 0)
      );
    })
    .map((entry) => {
      const isSelected = "next" in entry && entry.current !== entry.next;
      const label =
        typeof artistFilter === "object" &&
        artistFilter.filter === entry.current
          ? artistFilter.items.map((item) => filterNames[item]).join(" & ")
          : filterNames[entry.current as ArtistFilterOption];
      const onClick = getOnClick(entry, artistFilter, setArtistFilter);
      return {
        current: entry.current,
        onClick,
        selected: isSelected,
        label,
      };
    })
    .sort(({ selected }) => (selected ? -1 : 1));

  return filter;
};
