export enum ArtistFilterOption {
  ALL = "all",
  SPOTIFY = "spotify",
  NON_SPOTIFY = "nonSpotify",
}

export enum GroupableFilterOption {
  FOLLOWED = "followed",
  LIKED = "liked",
  ALBUMS = "albums",
}

export enum FilterGroupOption {
  SPOTIFY_GROUP = "spotifyGroup",
}

export const filterGroupMapping: Record<
  FilterGroupOption,
  GroupableFilterOption[]
> = {
  [FilterGroupOption.SPOTIFY_GROUP]: [
    GroupableFilterOption.FOLLOWED,
    GroupableFilterOption.LIKED,
    GroupableFilterOption.ALBUMS,
  ],
};

export const groupableFilterMapping: Record<
  GroupableFilterOption,
  FilterGroupOption
> = {
  [GroupableFilterOption.FOLLOWED]: FilterGroupOption.SPOTIFY_GROUP,
  [GroupableFilterOption.LIKED]: FilterGroupOption.SPOTIFY_GROUP,
  [GroupableFilterOption.ALBUMS]: FilterGroupOption.SPOTIFY_GROUP,
};

export const filterNames: Record<
  ArtistFilterOption | GroupableFilterOption,
  string
> = {
  [ArtistFilterOption.ALL]: "All",
  [ArtistFilterOption.SPOTIFY]: "Spotify",
  [GroupableFilterOption.FOLLOWED]: "Followed",
  [GroupableFilterOption.LIKED]: "Liked",
  [ArtistFilterOption.NON_SPOTIFY]: "Non-Spotify",
  [GroupableFilterOption.ALBUMS]: "Albums",
};

export interface FilterProps {
  current: ArtistFilterOption | FilterGroupOption | GroupableFilterOption;
  next: ArtistFilterOption;
}

export interface OrFilterProps {
  current: GroupableFilterOption;
  append: FilterGroupOption;
}
