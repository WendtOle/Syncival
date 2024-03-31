import { spotifyApi } from "./getSpotifyApi";

export enum Festival {
  FUSION_2023 = "fusion-2023",
  TARMAC_2022 = "tarmac-2022",
  TOMORROWLAND_2023 = "tomorrowland-2023",
  TARMAC_2023 = "tarmac-2023",
}

import { artists as fusion2023 } from "../data/fusion-artists";
import { artists as tarmac2022 } from "../data/tarmac-2022";
import { artists as tomorrowland2023 } from "../data/tomorrowland-2023";
import { artists as tarmac2023 } from "../data/tarmac-2023";

const lineup: Record<Festival, string[]> = {
  [Festival.FUSION_2023]: fusion2023.artists,
  [Festival.TARMAC_2022]: tarmac2022.artists,
  [Festival.TOMORROWLAND_2023]: tomorrowland2023.artists,
  [Festival.TARMAC_2023]: tarmac2023.artists,
};

interface Pagination {
  accessToken: string;
  festival: Festival;
  limit: number;
  offset: number;
}

export const getFestivalArtists = async ({
  accessToken,
  festival,
  limit,
  offset,
}: Pagination) => {
  spotifyApi.setAccessToken(accessToken);
  const toSearch = lineup[festival]
    .sort((a, b) => (a.toLowerCase() < b.toLowerCase() ? -1 : 1))
    .slice(offset, offset + limit);
  const searched = await Promise.all(toSearch.map(searchArtist));
  return searched;
};

const searchArtist = async (
  query: string
): Promise<SpotifyApi.ArtistObjectFull | string> => {
  const response = await spotifyApi.searchArtists(query, { limit: 10 });
  const artists = response.body.artists?.items;
  if (!artists) {
    console.log(`No artists found on Spotify for "${query}"`);
    return query;
  }
  const matchedArtist = artists.find(
    ({ name }) => name.toLowerCase() === query.toLowerCase()
  );
  if (!matchedArtist) {
    /* console.log(
      `No exact match found for "${query}". Only found ${artists
        .map(({ name }) => name)
        .join(", ")}.`
    );*/
    return query;
  }
  return matchedArtist;
};
