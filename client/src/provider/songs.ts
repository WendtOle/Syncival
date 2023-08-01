import { backendUrl } from "../state/loadEnvVariables";
import { Track } from "../state/types";

export const getPlaylistTracks = async (
  accessToken: string,
  page: number,
  playlistId: string,
): Promise<Track[]> => {
  const response = await fetch(
    `${backendUrl}/tracks?accessToken=${accessToken}&page=${page}&playlistId=${playlistId}`,
  );
  const tracks = await response.json();
  return tracks;
};
