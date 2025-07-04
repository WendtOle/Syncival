import { readdir } from "fs/promises";
import { join } from "path";
import { readFileSync, writeFileSync } from "fs";
import { spotifyApi } from "./provider/getSpotifyApi";
import { searchArtist } from "./provider/lineup";

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
    > => {
  try {
    const string = readFileSync(pathToFile, "utf8");
    const json = JSON.parse(string)
    if (!("artists" in json)) {
      console.log("artists key is not in json")
      return []
    }
    return json.artists ;
  } catch (e) {
    console.log(e);
    return [];
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
      readJSON(`./src/data/${filesName.replace(".txt", ".json")}`);
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
    }
    writeToFile(parsedArtists, filesName);
    console.log(
      `Loaded ${
        parsedArtists.filter((result: any) => "id" in result).length
      } artists.`
    );
    const filteredArtists = parsedArtists
        .filter((result: any) => !("id" in result))
    const artistString = filteredArtists
        .map(({ name }: { name: string }) => name)
        .join(", ")
    console.log(
      `Following artists could not be found: ${artistString} (${filteredArtists.length})`
    );
    console.log();
  }
};

const getCurrentDate = (): string => {
  const now = new Date();
  
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Europe/Berlin'
  };
  const formatted = now.toLocaleString('de-DE', options);
  return formatted.replace(',', '');
};

const writeToFile = (parsedArtists: Array<{}>, filesName: string) => {
  console.log("write to file")
  const object = {updated: getCurrentDate(), artists: parsedArtists}
  const stringified = JSON.stringify(object);
  writeFileSync(
    `./src/data/${filesName.replace(".txt", ".json")}`,
    stringified,
    "utf8"
  );
};

const run = async () => {
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN
  if (!refreshToken) {
    throw new Error("refresh token is not defined")
  }
  spotifyApi.setRefreshToken(refreshToken)
  const response = await spotifyApi.refreshAccessToken()
  const refreshAccessToken = response.body['access_token'];
  spotifyApi.setAccessToken(refreshAccessToken);
  await getFestivals();
};

run();
