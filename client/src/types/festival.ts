import { Artist } from "./artist";

export interface Festival {
  name: string;
  artists: Artist[];
  key: string;
  additionalInformation?: string;
}
