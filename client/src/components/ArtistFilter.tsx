import { ArtistFilterChip } from "./ArtistFilterChip";

export const ArtistFilter = () => {
  return (
    <div style={{ marginBottom: 8, marginLeft: 16 }}>
      <ArtistFilterChip
        label="Spotify"
        filterValue="spotify"
        showIf={["all", "followed", "liked"]}
        showAsSelectedIf={["followed", "liked"]}
      />
      <ArtistFilterChip
        label="Not on Spotify"
        filterValue="nonSpotify"
        showIf={["all"]}
      />
      <ArtistFilterChip
        label="Followed"
        filterValue="followed"
        showIf={["spotify", "liked"]}
        filterValueAfterUnselect="spotify"
      />
      <ArtistFilterChip
        label="Liked"
        filterValue="liked"
        showIf={["spotify", "followed"]}
        filterValueAfterUnselect="spotify"
      />
    </div>
  );
};
