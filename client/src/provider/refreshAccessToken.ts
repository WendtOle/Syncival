import { backendUrl } from "../state/loadEnvVariables";

export const refreshAccessToken = async ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}): Promise<string> => {
  const response = await fetch(
    `${backendUrl}/refresh?accessToken=${accessToken}&refreshToken=${refreshToken}`,
  );
  const newAccessToken = await response.text();
  return newAccessToken;
};
