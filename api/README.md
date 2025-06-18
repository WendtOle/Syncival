# Syncival API

## How to integrate new data

1) List of artist names
- extract some information from the timetable/lineup from the festival
- in the past I often used something like the following to receive some kind of JSON which contained the artist name and the type of event

```
const artists = [...document.querySelectorAll('div.sc-ibQzxG')].map(container => {
  const artist = container.querySelector('div.sc-fiCwYx')?.innerText.trim();
  const type = container.querySelector('span.sc-kbhIEe')?.innerText.trim();
  return { artist, type };
});
JSON.stringify(artists)
```

- the type is important to filter out workshops, readings, films or other stuff I don't want to have as an artist
- how this is done is not of importance
- the important thing is that the output is just a list of artist names as described in the next step

2) Preprocess list
- as an input a .txt file is needed in which the artists names are contained in double quotes ("") and separated via comma
- its a bit hacky but the access_token which is defined in the preprocess script has to be updated 
- for that simply login to the Syncival application an copy the access_token from the local storage
- run `npm run preprocess -- dry`

3) Deploy
- update src/data/festivalInformation.ts and integrate new lineup 
- run `npm run deploy:prod`
- this runs the vercel cli command to deploy the project
- for some reason the automatic deployment which is triggered when pushed to the repo did not worked for the api part of Syncival

## Open Topics
- what whas the idea behind the `dry` mode of the preprocess script

