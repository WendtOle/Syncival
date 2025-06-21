import { writeFileSync } from 'fs';
import fetch from 'node-fetch'; 

//the web app from the fusion loads a chung js file, retrieve and parse it!
const URL = "https://timetable.fusion-festival.de/static/js/346.003d780e.chunk.js"

const fetchAndExtractJSON = async () => {
  const response = await fetch(URL);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const jsCode = await response.text();

  // Extract the full JSON.parse('...') argument string
  const match = jsCode.match(/JSON\.parse\(\s*'([\s\S]+?)'\s*\)/);

  if (match && match[1]) {
    const jsonStringLiteral = `'${match[1]}'`;

    try {
      // Use eval to let JS interpret the string literal correctly
      const unescapedJsonString = eval(jsonStringLiteral);

      // Now parse the clean JSON
      const data = JSON.parse(unescapedJsonString);

      const artists = extractArtistSTrings(data).sort()

      console.log(`${artists.length} artists extracted`)
      const fileName = "fusion-2025.txt"
      writeFileSync(fileName, artists.join(", "));
    } catch (err) {
      console.error('Failed to evaluate or parse JSON:', err);
    }
  } else {
    console.error('JSON.parse pattern not found in the JS code.');
  }
}
fetchAndExtractJSON();

const genres = ["Live Act", "DJ", "Band"];

const extractArtistSTrings = (data: Array<{}>) => data
  .filter((value) => {
    if (!("genre" in value)) {
      throw new Error("Genre is missing");
    }
    const { genre } = value;
    if (typeof genre !== "string") {
      throw new Error("Genre is not a string");
    }
    return genres.includes(genre);
  })
  .reduce((acc: string[], value) => {
    if (!("artist" in value)) {
      throw new Error("Artist is missing");
    }
    const { artist } = value;
    if (typeof artist !== "string") {
      throw new Error("Artist is not a string");
    }
    const splitted = artist.split(/[&+]/).map(part => `"${part.trim()}"`);
    return [...acc, ...splitted];
  }, [] as string[]);