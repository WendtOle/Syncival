import { backendUrl } from "../state/loadEnvVariables";
import { Lineup } from "../state/types";

export const getLineups = async (): Promise<Lineup[]> => {
  const response = await fetch(`${backendUrl}/lineups`);
  return await response.json();
};
