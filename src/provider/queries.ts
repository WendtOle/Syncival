import { backendUrl } from "../state/loadEnvVariables";

export enum QueryType {
  album = "album",
  followed = "followed",
  lineups = "lineups",
  liked = "liked",
}

export const albumQuery = (accessToken: () => string) => ({
  queryKey: [QueryType.album],
  queryFn: async () => {
    const response = await fetch(
      `${backendUrl}/savedAlbums?accessToken=${accessToken()}`
    );
    return await response.json();
  },
});

export const followedQuery = (accessToken: () => string) => ({
  queryKey: [QueryType.followed],
  queryFn: async () => {
    const response = await fetch(
      `${backendUrl}/followed?accessToken=${accessToken()}`
    );
    return await response.json();
  },
});

export const lineupsQuery = {
  queryKey: [QueryType.lineups],
  queryFn: async () => {
    const response = await fetch(`./api/festivals`);
    return await response.json();
  },
};

export const likedQuery = (accessToken: () => string) => ({
  queryKey: [QueryType.liked],
  queryFn: async () => {
    const response = await fetch(
      `${backendUrl}/liked?accessToken=${accessToken()}`
    );
    return await response.json();
  },
});
