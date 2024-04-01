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

interface Lineup {
  name: string;
  artists: string[];
}

export const lineup: Record<Festival, Lineup> = {
  [Festival.FUSION_2023]: fusion2023,
  [Festival.TARMAC_2022]: tarmac2022,
  [Festival.TOMORROWLAND_2023]: tomorrowland2023,
  [Festival.TARMAC_2023]: tarmac2023,
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
  try {
    spotifyApi.setAccessToken(accessToken);
    const toSearch = lineup[festival].artists
      .sort((a, b) => (a.toLowerCase() < b.toLowerCase() ? -1 : 1))
      .slice(offset, offset + limit);
    if (toSearch.length === 0) return [];
    const searched = await Promise.all(toSearch.map(searchArtist));
    const spotifyArtistIds = searched
      .filter((artist) => typeof artist === "object")
      .map((artist) => (artist as { id: string }).id);
    const response = await spotifyApi.isFollowingArtists(spotifyArtistIds);
    const flagged = response.body.map((isFollowing: boolean, i: number) => {
      return {
        artist: spotifyArtistIds[i],
        isFollowing,
      };
    });

    return searched.map((artist) => {
      if (typeof artist === "string") return artist;
      const followed = flagged.find(
        ({ artist: artistId }) => artistId === artist.id
      );
      return {
        ...artist,
        followed: followed?.isFollowing ?? false,
      };
    });
  } catch (error: any) {
    if (error.statusCode === 429) {
      console.log("Too many requests to Spotify API.");
      return [];
    }
    console.error("Error when fetching festival artists.");
    console.error({ error, body: error.body });
    return [];
  }
};

const searchArtist = async (
  query: string
): Promise<SpotifyApi.ArtistObjectFull | string> => {
  const response = await spotifyApi.searchArtists(query, { limit: 5 });
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
