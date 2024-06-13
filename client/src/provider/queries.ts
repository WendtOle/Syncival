import { backendUrl } from "../state/loadEnvVariables";

export enum QueryType {
  album = "album",
  followed = "followed",
  lineups = "lineups",
  liked = "liked",
  playlistId = "playlistId",
  playlistArtist = "playlistArtist",
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
    const response = await fetch(`${backendUrl}/festivals`);
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

export const playlistIDQuery = (accessToken: () => string) => ({
  queryKey: [QueryType.playlistId],
  queryFn: async () => {
    const response = await fetch(
      `${backendUrl}/playlists?accessToken=${accessToken()}`
    );
    return await response.json();
  },
});

export const playlistArtistQuery = (
  accessToken: () => string,
  playlistIds: string[]
) => ({
  queryKey: [QueryType.playlistArtist],
  queryFn: async () => {
    const recursive = async (index = 0): Promise<string[]> => {
      if (index >= playlistIds.length) {
        return [];
      }
      await new Promise((r) => setTimeout(r, 500));
      const response = await fetch(
        `${backendUrl}/tracks?accessToken=${accessToken()}&playlistId=${
          playlistIds[index]
        }`
      );
      const data = await response.json();
      return [...data, ...(await recursive(index + 1))];
    };
    return (await recursive()).flat();
  },
});
