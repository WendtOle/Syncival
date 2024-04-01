import { ArtistFilterChip } from "./ArtistFilterChip";

interface ArtistFilterProps {
  allArtistsLoaded: boolean;
}

export const ArtistFilter = ({ allArtistsLoaded }: ArtistFilterProps) => {
  return (
    <div style={{ marginBottom: 8, marginLeft: 16 }}>
      <ArtistFilterChip
        label="Spotify"
        filterValue="spotify"
        showIf={["all", "followed"]}
        showAsSelectedIf={["followed"]}
      />
      <ArtistFilterChip
        label="Not on Spotify"
        filterValue="nonSpotify"
        showIf={["all"]}
      />
      {allArtistsLoaded && (
        <ArtistFilterChip
          label="Followed"
          filterValue="followed"
          showIf={["spotify"]}
          filterValueAfterUnselect="spotify"
        />
      )}
    </div>
  );
};
