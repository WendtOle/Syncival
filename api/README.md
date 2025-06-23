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

## How to deploy update script onto pi

- use raspberry pi imager to install ubuntu server on pi 
- set ssh key and wifi credentials
- boot pi
- `sudo apt update``
- create ssh key: `ssh-keygen -t ed25519 -C "raspberry-pi-auto-push" -f ~/.ssh/id_pi_git` and just enter through the passphrase
- display public key and add it to github `cat ~/.ssh/id_pi_git.pub` -> "/settings/keys/new", allow write access
- add following config to .ssh/config
```
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_pi_git
  IdentitiesOnly yes
```
- give script execution access `chmod +x api/bin/update-artists.sh`
- run `sudo apt install -y nodejs npm`
- run `cp .env.example .env` and adjust values
- execute script (with any argument to actually push / or without to make a dry run)
- open crontab via `crontab -e` and add:
```
0 * * * * <path-to-repo>/api/bin/update-artists.sh push >> <some-path>/syncival-cron.log 2>&1
```

### TODO 

- i had the naive approach to simply reference always the same chunk file (see fusion-25.ts)
- this does not work because the chunk file gets a new id if it is updated
- for future years this should be improved, so the crawler looks in some file which references the chunk file
- which then gets crawled


## Open Topics
- what whas the idea behind the `dry` mode of the preprocess script

