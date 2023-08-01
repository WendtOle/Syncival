import { backendUrl } from "../state/loadEnvVariables";

export const getData = async (): Promise<Record<string, string[]>> => {
  const response = await fetch(`${backendUrl}/data`);
  const data = await response.json();
  return data;
};
