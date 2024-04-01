import { backendUrl } from "../state/loadEnvVariables";

type TokenStatus = "expired" | "ok" | "forbidden";

export const getAccessTokenStatus = async ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}): Promise<TokenStatus> => {
  const response = await fetch(
    `${backendUrl}/accessTokenValid?accessToken=${accessToken}&refreshToken=${refreshToken}`
  );
  const tokenStatus = await response.text();

  if (!["ok", "expired", "forbidden"].includes(tokenStatus)) {
    throw new Error(`Unexpected tokenStatus "${tokenStatus}"`);
  }

  return tokenStatus as TokenStatus;
};
