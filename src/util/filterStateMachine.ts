import {
  ArtistFilterOption,
  FilterGroupOption,
  GroupableFilterOption,
  FilterProps,
  OrFilterProps,
} from "../types/filter";

export const filterStateMachine: Record<
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
