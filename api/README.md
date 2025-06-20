# Syncival API

## How to integrate new data

1) List of artist names

- the web of the fusion loads internally a chunk.js file which contains the necessary information
- open in dev tools, and look for a request which contains the string "chunk.js" 
- use this URL for the retreaval script located in data-raw
- run the script via `npx ts-node <extraction-script-path>`

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

