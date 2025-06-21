import { readdir } from "fs/promises";
import { join } from "path";

import { readFileSync, writeFileSync } from "fs";
import { spotifyApi } from "./provider/getSpotifyApi";
import { searchArtist } from "./provider/lineup";
import { skip } from "node:test";

enum ExecutionMode {
  DRY = "dry",
}

const mode = process.argv[2];
if (mode !== ExecutionMode.DRY) {
  throw new Error(`Invalid mode: ${mode}`);
}

const readJSON = (
  pathToFile: string
):
  | Array<
      Pick<SpotifyApi.ArtistObjectFull, "name"> | SpotifyApi.ArtistObjectFull
    >
  | undefined => {
  try {
    const string = readFileSync(pathToFile, "utf8");
    return JSON.parse(string) ?? [];
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

export const getFestivals = async () => {
  const files = (await readdir(join(__dirname, "data-raw"))).filter((file) =>
    file.endsWith(".txt")
  );

  if (files.length === 0) {
    console.log("No festivals found.");
    return;
  }

  const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));

  const overwrite = false;

  for (const filesName of files) {
    console.log(`Processing ${filesName}`);
    const alreadyLoaded =
      readJSON(`./src/data/${filesName.replace(".txt", ".json")}`) ?? [];
    const data = readFileSync(`./src/data-raw/${filesName}`, "utf8");
    const skipThoseNames = alreadyLoaded.map(({ name }) => name);
    const artists = data
      .replace(/\"/g, "")
      .split(",")
      .map((entry) => entry.trim())
      .filter(
        (entry: string) =>
          overwrite ||
          !skipThoseNames.find(
            (name) => name.toLocaleLowerCase() === entry.toLocaleLowerCase()
          )
      );
    const parsedArtists = overwrite ? [] : alreadyLoaded;
    for (const artist of artists) {
      process.stdout.write(
        `${parsedArtists.length + 1}/${artists.length} - ${artist}`
      );
      await delay();
      const parsedArtist = await searchArtist(artist);
      //const parsedArtist = { name: artist };
      // disable the following if run in crontab
      parsedArtists.push(parsedArtist);
      if (process.stdout.isTTY) {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
      }
      writeToFile(parsedArtists, filesName);
    }
    console.log(
      `Loaded ${
        parsedArtists.filter((result: any) => "id" in result).length
      } artists.`
    );
    console.log(
      `Following artists could not be found: ${parsedArtists
        .filter((result: any) => !("id" in result))
        .map(({ name }: { name: string }) => name)
        .join(", ")}`
    );
    console.log();
  }
};

const writeToFile = (parsedArtists: any, filesName: string) => {
  const stringified = JSON.stringify(parsedArtists);
  writeFileSync(
    `./src/data/${filesName.replace(".txt", ".json")}`,
    stringified,
    "utf8"
  );
};

const ACCESS_TOKEN =
  "BQC2bLrpHvcCO7Zv6eZ-J1NiJGfq4arAtX09RRlnvvB0JqRN6LPdaFJen2TkjAUvvzeXXZYFMFdCqt61vq25_gZCd7wSkP-ObezgbboMz_wPPO_NrCunvKwStRE8wtCshoK0P_8H_sGLNVuwdPnoiqaWs3n2jjLhxIv73pM7etb6mHNU799r2iHVcRBBqjP6bysx6XsdFx-FRzRJs0IEEHoPatEJPk32L-IAy8Qor5xReTQmJiXS93qY8Q8x3pH6Okf31T0UKuZ1Wkw";

const run = async () => {
  spotifyApi.setAccessToken(ACCESS_TOKEN);
  await getFestivals();
};

run();
