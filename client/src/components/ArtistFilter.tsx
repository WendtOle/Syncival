import { ArtistFilterChip } from "./ArtistFilterChip";
import { ArtistFilterOption, artistsFilterAtom } from "../state/ui";
import { useAtom } from "jotai";

interface FilterProps {
  current: ArtistFilterOption;
  next: ArtistFilterOption;
}

const filterStateMachine: Record<ArtistFilterOption, Array<FilterProps>> = {
  [ArtistFilterOption.ALL]: [
    { current: ArtistFilterOption.SPOTIFY, next: ArtistFilterOption.SPOTIFY },
    {
      current: ArtistFilterOption.NON_SPOTIFY,
      next: ArtistFilterOption.NON_SPOTIFY,
    },
  ],
  [ArtistFilterOption.SPOTIFY]: [
    { current: ArtistFilterOption.SPOTIFY, next: ArtistFilterOption.ALL },
    { current: ArtistFilterOption.LIKED, next: ArtistFilterOption.LIKED },
    { current: ArtistFilterOption.FOLLOWED, next: ArtistFilterOption.FOLLOWED },
  ],
  [ArtistFilterOption.FOLLOWED]: [
    {
      current: ArtistFilterOption.LIKED,
      next: ArtistFilterOption.LIKED_AND_FOLLOWED,
    },
    { current: ArtistFilterOption.FOLLOWED, next: ArtistFilterOption.SPOTIFY },
  ],
  [ArtistFilterOption.LIKED]: [
    { current: ArtistFilterOption.LIKED, next: ArtistFilterOption.SPOTIFY },
    {
      current: ArtistFilterOption.FOLLOWED,
      next: ArtistFilterOption.LIKED_AND_FOLLOWED,
    },
  ],
  [ArtistFilterOption.LIKED_AND_FOLLOWED]: [
    {
      current: ArtistFilterOption.LIKED_AND_FOLLOWED,
      next: ArtistFilterOption.SPOTIFY,
    },
  ],
  [ArtistFilterOption.NON_SPOTIFY]: [
    { current: ArtistFilterOption.NON_SPOTIFY, next: ArtistFilterOption.ALL },
  ],
};

const filterNames: Record<ArtistFilterOption, string> = {
  [ArtistFilterOption.ALL]: "All",
  [ArtistFilterOption.SPOTIFY]: "Spotify",
  [ArtistFilterOption.FOLLOWED]: "Followed",
  [ArtistFilterOption.LIKED]: "Liked",
  [ArtistFilterOption.NON_SPOTIFY]: "Non-Spotify",
  [ArtistFilterOption.LIKED_AND_FOLLOWED]: "Liked & Followed",
};

export const ArtistFilter = () => {
  const [artistFilter, setArtistFilter] = useAtom(artistsFilterAtom);

  const filterToShow = filterStateMachine[artistFilter];

  return (
    <div style={{ marginBottom: 8, marginLeft: 16 }}>
      {filterToShow
        .map(({ current, next }) => ({
          current,
          next,
          selected:
            current !== next && next !== ArtistFilterOption.LIKED_AND_FOLLOWED,
        }))
        .sort(({ selected }) => (selected ? -1 : 1))
        .map(({ current, next, selected }) => (
          <ArtistFilterChip
            key={current}
            label={filterNames[current]}
            onClick={() => setArtistFilter(next)}
            selected={selected}
          />
        ))}
    </div>
  );
};
