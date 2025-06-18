import Filter, { EFilter } from "@/app/Filter";
import Header from "../../Header";
import { Artist } from "../../artist";
import {
  Festival,
  festivalDataPath,
  festivalNames,
  isFestival,
} from "../../data/festivalInformation";
import ArtistComponent from "./ArtistItem";

export const dynamic = "force-dynamic"

export function generateStaticParams() {
  return Object.values(Festival).flatMap((festivalKey) =>
    ["spotify", "not-on-spotify", undefined].map((filter) => ({
      params: { festivalKey },
      searchParams: { filter },
    }))
  );
}

export default async function Lineup(params: {
  params: { festivalKey: Festival };
  searchParams: { filter: string | undefined };
}) {
  console.log("DEBUG", params);
  const { festivalKey } = params.params;
  const { filter } = params.searchParams;

  if (!isFestival(festivalKey)) {
    return <div>Unknown festival</div>;
  }
  const artists: Artist[] = Object.values(
    await import(`../../data/${festivalDataPath[festivalKey]}`)
  );

  const filteredArtists = artists.filter((artist) => {
    if (typeof artist !== "object") {
      return undefined;
    }
    if (filter === EFilter.spotify) {
      return "id" in artist ? artist : undefined;
    }
    if (filter === EFilter.notOnSpotify) {
      return !("id" in artist) ? artist : undefined;
    }
    return artist;
  });
  const sortedArtists = filteredArtists.sort((a, b) =>
    a.name < b.name ? -1 : 1
  );

  return (
    <div>
      <Header title={festivalNames[festivalKey]}>
        <Filter pathname={`/festival/${festivalKey}`} selectedFilter={filter} />
      </Header>
      <ul>
        {sortedArtists.map((artist, index) => (
          <li key={index}>
            <ArtistComponent artist={artist} />
          </li>
        ))}
      </ul>
    </div>
  );
}
