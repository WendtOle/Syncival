import { backendUrl } from "../state/loadEnvVariables";
import { DataEntry } from "../state/types";

export const getData = async (): Promise<DataEntry[]> => {
  const response = await fetch(`${backendUrl}/data`);
  const data = await response.json();
  return data;
};
