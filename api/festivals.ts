import type { VercelResponse, VercelRequest } from "@vercel/node";
import { readFileSync } from "fs";
import { join } from "path";

console.log({ __dirname, processThingy: process.cwd() });

import {
  Festival,
  additionalInformation,
  festivalNames,
  // @ts-ignore
} from "../api-src/data/festivalInformation.ts";

const festival = (_: VercelRequest, response: VercelResponse) => {
  const festivals = Object.values(Festival).map((key) => {
    const path = join(process.cwd(), `/api-src/data/${key}.json`);
    console.log({ path });
    const string = readFileSync(path, "utf8");
    const lineup = JSON.parse(string);
    return {
      name: festivalNames[key],
      key,
      artists: lineup,
      additionalInformation: additionalInformation[key],
    };
  });
  response.send(festivals);
};

export default festival;
