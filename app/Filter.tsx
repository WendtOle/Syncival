import { Chip } from "./Chip";

export enum EFilter {
  spotify = "spotify",
  notOnSpotify = "not-on-spotify",
}

export default async function Filter({
  pathname,
  selectedFilter,
}: {
  pathname: string;
  selectedFilter: string | undefined;
}) {
  return (
    <div className="flex space-x-2">
      <Chip
        text="Not on spotify"
        href={{ pathname, query: { filter: EFilter.notOnSpotify } }}
        selected={selectedFilter === EFilter.notOnSpotify}
      />
      <Chip
        text="On spotify"
        href={{ pathname, query: { filter: EFilter.spotify } }}
        selected={selectedFilter === EFilter.spotify}
      />
    </div>
  );
}
