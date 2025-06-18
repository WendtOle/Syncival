export enum Festival {
  "TOMORROWLAND_2023" = "tomorrowland-2023",
  "FUSION_2023" = "fusion-2023",
  "FUSION_2024" = "fusion-2024",
  "FUSION_2025" = "fusion-2025",
  "TARMAC_2023" = "tarmac-2023",
}

export const festivalNames: Record<Festival, string> = {
  [Festival.TOMORROWLAND_2023]: "Tomorrowland 2023",
  [Festival.FUSION_2023]: "Fusion 2023",
  [Festival.FUSION_2024]: "Fusion 2024",
  [Festival.TARMAC_2023]: "Tarmac 2023",
  [Festival.FUSION_2025]: "Fusion 2025"
};

export const additionalInformation: Partial<Record<Festival, string>> = {
  [Festival.FUSION_2024]: "updated 25. June 2024",
  [Festival.FUSION_2025]: "updated 18. June 2025"
};
