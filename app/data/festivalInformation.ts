export enum Festival {
  "TOMORROWLAND_2023" = "tomorrowland-2023",
  "FUSION_2023" = "fusion-2023",
  "FUSION_2024" = "fusion-2024",
  "TARMAC_2023" = "tarmac-2023",
}

export function isFestival(value: any): value is Festival {
  return Object.values(Festival).includes(value);
}

export const festivalDataPath: Record<Festival, string> = {
  [Festival.TOMORROWLAND_2023]: "tomorrowland-2023.json",
  [Festival.FUSION_2023]: "fusion-2023.json",
  [Festival.FUSION_2024]: "fusion-2024.json",
  [Festival.TARMAC_2023]: "tarmac-2023.json",
};

export const festivalNames: Record<Festival, string> = {
  [Festival.TOMORROWLAND_2023]: "Tomorrowland 2023",
  [Festival.FUSION_2023]: "Fusion 2023",
  [Festival.FUSION_2024]: "Fusion 2024 (PREVIEW)",
  [Festival.TARMAC_2023]: "Tarmac 2023",
};

export const additionalInformation: Partial<Record<Festival, string>> = {
  [Festival.FUSION_2024]:
    "updated 12.April, manually assembled from forum: https://forum.fusion-festival.de/viewtopic.php?t=49019&sid=32c341e01fb2c23230e83357cc620d8c",
};
