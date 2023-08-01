# What it is
Compares artists found in spotify playlists with the artists of fusion 2023 lineup.

# How to use
1. Create Account at https://developer.spotify.com/documentation/web-api
2. Create application with redirect url "localhost:8888/callback"
3. Copy ".env.example" to ".env" and fill in `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` from spotify app settings https://developer.spotify.com/dashboard/<some-id>/settings
4. Install and start
```
npm i
npm start
```
5. Open browser and navigate to "localhost:8888"
6. Log into Spotify and trust that the application does nothing bad with your spotify data
7. Wait a while until all artists are retrieved

# Why is it not hosted?
Querying all the playlists takes up more than 30 second. 
Which is usally the maximum time amount which free provider allow until requests are closed automatically.

# Where to find more information apart of the list of artists
Look in the logs of the server!

# It is not pretty?
Sorry.

# How does the authorization/authentication flow works
1. With `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` the spotify api object is initialized
2. With `scopes` and the spotify api object an authorization url is created
3. When the autorizaton url is opened the user has to log into spotify and accept the some read right for the application 
4. After accepted the redirect url is opened
5. In the url a `code` parameter is added
6. With the `code` parameter the `access_token` and the `refresh_token` can be retrieved
7. Both tokens are added to the spotify api object
8. If the `access_token` gets invalid after a while the `refresh_token` can be used to retrieve a new `access_token`
9. The shopify api object can be used to make queries to spotify

# Things I learned about the spotify api
I use my "spotify api app" with my own spotify account without any problems.
If I want to use my spotify app with another spotify account it is necessary to register this user with "Username" and "Email" under "https://developer.spotify.com/dashboard/<some-id>/users".

# How is it deployed

## API
- through vercel
- NOT by connecting to git, because this worked for some reason not because I want to use it as a serverless function
- but to manual deployments through `npm run deploy:prod` or `npm run deploy:dev`
- by setting `ALLOWED_ORIGINS` environment variables multiple domains can be allowed by the api