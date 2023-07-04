const url = "https://www.fusion-festival.de/de/2023/programm/"
//import cheerio
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');

// scrape artits name from page and append to fusion-artists.json
// artits are saved inside <header><h4>AACKR</h4></header>
// in the above example the artist would be AACKR

const types = [
    "band",
    "dj",
    "live-act"
]

const getArtists = async (type) => {
    const response = await axios.get(url+type)
    const html = response.data;
    const $ = cheerio.load(html);
    const artists = [];
    $('h4').each((i, elem) => {
        artists.push($(elem).text());
    });
    return artists;
}

const run = async () => {
    //call getArtists() with each item of types array and save all in fusion-artists.json
    const artists = [];
    for (const type of types) {
        const artistsOfType = await getArtists(type);
        artists.push(...artistsOfType);
    }
    // save artists to fusion-artists.json
    fs.writeFileSync('fusion-artists.json', JSON.stringify(artists));
    // log how many artists were saved
    console.log(`Saved ${artists.length} artists to fusion-artists.json`);
}


run()
