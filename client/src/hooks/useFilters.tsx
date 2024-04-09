import { useAtom } from "jotai";
import { artistsFilterAtom } from "../state/ui";
import {
  filterGroupMapping,
  groupableFilterMapping,
  filterNames,
  ArtistFilterOption,
  FilterGroupOption,
  GroupableFilterOption,
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

  return filterToShow;
};
