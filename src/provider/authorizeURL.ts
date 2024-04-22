import { backendUrl } from "../state/loadEnvVariables";

export const getAuthorizeURL = async (): Promise<string> => {
  const response = await fetch(`${backendUrl}/authorizeURL`);
  return response.text();
};
