import { ArtistFilterChip } from "./ArtistFilterChip";
import {
  ArtistFilterOption,
  FilterGroupOption,
  GroupableFilterOption,
  artistsFilterAtom,
  filterGroupMapping,
  groupableFilterMapping,
} from "../state/ui";
import { useAtom } from "jotai";
import { useArtists } from "../hooks/useArtistsNew";

interface FilterProps {
  current: ArtistFilterOption | FilterGroupOption | GroupableFilterOption;
  next: ArtistFilterOption;
}

interface OrFilterProps {
  current: GroupableFilterOption;
  append: FilterGroupOption;
}

const filterStateMachine: Record<
  ArtistFilterOption | FilterGroupOption | GroupableFilterOption,
  Array<FilterProps | OrFilterProps>
> = {
  [ArtistFilterOption.ALL]: [
    { current: ArtistFilterOption.SPOTIFY, next: ArtistFilterOption.SPOTIFY },
    {
      current: ArtistFilterOption.NON_SPOTIFY,
      next: ArtistFilterOption.NON_SPOTIFY,
    },
  ],
  [ArtistFilterOption.SPOTIFY]: [
    { current: ArtistFilterOption.SPOTIFY, next: ArtistFilterOption.ALL },
    {
      current: GroupableFilterOption.LIKED,
      append: FilterGroupOption.SPOTIFY_GROUP,
    },
    {
      current: GroupableFilterOption.FOLLOWED,
      append: FilterGroupOption.SPOTIFY_GROUP,
    },
    {
      current: GroupableFilterOption.ALBUMS,
      append: FilterGroupOption.SPOTIFY_GROUP,
    },
  ],
  [GroupableFilterOption.FOLLOWED]: [
    {
      current: GroupableFilterOption.LIKED,
      append: FilterGroupOption.SPOTIFY_GROUP,
    },
    {
      current: GroupableFilterOption.ALBUMS,
      append: FilterGroupOption.SPOTIFY_GROUP,
    },
    {
      current: GroupableFilterOption.FOLLOWED,
      next: ArtistFilterOption.SPOTIFY,
    },
  ],
  [GroupableFilterOption.LIKED]: [
    { current: GroupableFilterOption.LIKED, next: ArtistFilterOption.SPOTIFY },
    {
      current: GroupableFilterOption.FOLLOWED,
      append: FilterGroupOption.SPOTIFY_GROUP,
    },
    {
      current: GroupableFilterOption.ALBUMS,
      append: FilterGroupOption.SPOTIFY_GROUP,
    },
  ],
  [FilterGroupOption.SPOTIFY_GROUP]: [
    {
      current: FilterGroupOption.SPOTIFY_GROUP,
      next: ArtistFilterOption.SPOTIFY,
    },
  ],
  [ArtistFilterOption.NON_SPOTIFY]: [
    { current: ArtistFilterOption.NON_SPOTIFY, next: ArtistFilterOption.ALL },
  ],
  [GroupableFilterOption.ALBUMS]: [
    { current: GroupableFilterOption.ALBUMS, next: ArtistFilterOption.SPOTIFY },
    {
      current: GroupableFilterOption.FOLLOWED,
      append: FilterGroupOption.SPOTIFY_GROUP,
    },
    {
      current: GroupableFilterOption.LIKED,
      append: FilterGroupOption.SPOTIFY_GROUP,
    },
  ],
};

const filterNames: Record<ArtistFilterOption | GroupableFilterOption, string> =
  {
    [ArtistFilterOption.ALL]: "All",
    [ArtistFilterOption.SPOTIFY]: "Spotify",
    [GroupableFilterOption.FOLLOWED]: "Followed",
    [GroupableFilterOption.LIKED]: "Liked",
    [ArtistFilterOption.NON_SPOTIFY]: "Non-Spotify",
    [GroupableFilterOption.ALBUMS]: "Albums",
  };

export const ArtistFilter = () => {
  const [artistFilter, setArtistFilter] = useAtom(artistsFilterAtom);
  const result = useArtists();

  const key =
    typeof artistFilter === "object" ? artistFilter.filter : artistFilter;

  const additionalFilter =
    typeof artistFilter === "object"
      ? filterGroupMapping[artistFilter.filter].filter(
          (filter) => !artistFilter.items.includes(filter),
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
    .map((entry) => {
      const onClick = () => {
        if ("append" in entry && typeof artistFilter === "object") {
          setArtistFilter({
            ...artistFilter,
            items: [...artistFilter.items, entry.current],
          });
          return;
        }
        if ("append" in entry && typeof artistFilter === "string") {
          setArtistFilter({ filter: entry.append, items: [entry.current] });
          return;
        }
        if ("next" in entry) {
          setArtistFilter(entry.next);
          return;
        }
        console.log({ artistFilter, entry });
        throw new Error("this case was not handled");
      };
      return {
        current: entry.current,
        onClick,
        selected: "next" in entry && entry.current !== entry.next,
        label:
          typeof artistFilter === "object" &&
          artistFilter.filter === entry.current
            ? artistFilter.items.map((item) => filterNames[item]).join(" & ")
            : filterNames[entry.current as ArtistFilterOption],
      };
    })
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
