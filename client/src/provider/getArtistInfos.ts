import { backendUrl } from "../state/loadEnvVariables";
import { LimitedArtist } from "../state/types";

export const getArtistInfos = async (
  accessToken: string,
  artistIds: string[],
): Promise<LimitedArtist[]> => {
  const artistIdParams = artistIds.map((id) => `artistId=${id}`).join("&");
  const response = await fetch(
    `${backendUrl}/artist-infos?accessToken=${accessToken}&${artistIdParams}`,
    { method: "GET" },
  );
  return await response.json();
};
