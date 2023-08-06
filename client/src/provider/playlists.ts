import { backendUrl } from "../state/loadEnvVariables";
import { PlaylistInformation } from "../state/types";

export const getPlaylists = async (
  accessToken: string,
  page: number,
): Promise<Record<string, PlaylistInformation>> => {
  const response = await fetch(
    `${backendUrl}/playlists?accessToken=${accessToken}&page=${page}`,
  );
  return await response.json();
};
