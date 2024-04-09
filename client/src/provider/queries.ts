import { backendUrl } from "../state/loadEnvVariables";

export const albumQuery = (accessToken: () => string) => ({
  queryKey: ["album"],
  queryFn: async () => {
    const response = await fetch(
      `${backendUrl}/savedAlbums?accessToken=${accessToken()}`
    );
    return await response.json();
  },
});

export const followedQuery = (accessToken: () => string) => ({
  queryKey: ["followed"],
  queryFn: async () => {
    const response = await fetch(
      `${backendUrl}/followed?accessToken=${accessToken()}`
    );
    return await response.json();
  },
});

export const lineupsQuery = {
  queryKey: ["lineups"],
  queryFn: async () => {
    const response = await fetch(`${backendUrl}/festivals`);
    return await response.json();
  },
};

export const likedQuery = (accessToken: () => string) => ({
  queryKey: ["liked"],
  queryFn: async () => {
    const response = await fetch(
      `${backendUrl}/liked?accessToken=${accessToken()}`
    );
    return await response.json();
  },
});
