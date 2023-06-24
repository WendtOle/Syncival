// extract json from fusion timetable url env variable
// save to timetable.json

const fs = require('fs');
const axios = require('axios');
const { promisify } = require('util');
require('dotenv').config();

const writeFile = promisify(fs.writeFile);

const url = process.env.FUSION_TIMETABLE_URL;

const getTimetable = async () => {
    const response = await axios.get(url)
    await writeFile('timetable.json', JSON.stringify(response.data));
}

// read timetable.txt and parse to json and save into timetable.json


const run = async () => {
    const timetable = fs.readFileSync('timetable.txt', 'utf8');
    const timetableJson = JSON.parse(timetable);
    fs.writeFileSync('timetable.json', JSON.stringify(timetableJson));
}

run();