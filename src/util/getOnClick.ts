import {
  ArtistFilterOption,
  FilterGroupOption,
  FilterProps,
  GroupableFilterOption,
  OrFilterProps,
} from "../types/filter";

export const getOnClick = (
  entry: FilterProps | OrFilterProps,
  artistFilter:
    | ArtistFilterOption
    | {
        filter: FilterGroupOption;
        items: GroupableFilterOption[];
      },
  setArtistFilter: (
    input:
      | ArtistFilterOption
      | {
          filter: FilterGroupOption;
          items: GroupableFilterOption[];
        }
  ) => void
) => {
  if ("append" in entry && typeof artistFilter === "object") {
    return () => {
      setArtistFilter({
        ...artistFilter,
        items: [...artistFilter.items, entry.current],
      });
    };
  }
  if ("append" in entry && typeof artistFilter === "string") {
    return () => {
      setArtistFilter({ filter: entry.append, items: [entry.current] });
    };
  }
  if ("next" in entry) {
    return () => {
      setArtistFilter(entry.next);
    };
  }
  throw new Error("this case was not handled");
};
