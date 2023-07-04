/*
compare aritsts listed in spotify-artists.json with artists listed in fusion-artists.json
- display which artists are in both lists present

*/

const fs = require('fs');

const spotifyArtists = JSON.parse(fs.readFileSync('spotify-artists.json'));

const fusionArtists = JSON.parse(fs.readFileSync('fusion-artists.json'));

const artistsInBoth = spotifyArtists.filter(artist => fusionArtists.includes(artist));

console.log(artistsInBoth);
console.log(`Found ${artistsInBoth.length} artists in both lists`);
