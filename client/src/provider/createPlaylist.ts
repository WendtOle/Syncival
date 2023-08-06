import { backendUrl } from "../state/loadEnvVariables";

export const createPlaylist = async (
  accessToken: string,
  trackIds: string[],
  lineupName: string,
  playlistId?: string,
): Promise<string> => {
  const trackIdParams = trackIds.map((id) => `trackId=${id}`).join("&");
  const playlistIdParam = playlistId ? `playlistId=${playlistId}` : "";
  const response = await fetch(
    `${backendUrl}/createPlaylist?accessToken=${accessToken}&${trackIdParams}&lineupName=${lineupName}&${playlistIdParam}`,
    { method: "POST" },
  );
  const json = await response.json();
  return json.playlistId;
};
