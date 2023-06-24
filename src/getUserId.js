// retrieve spotify user id from spotify api

const {spotifyApi} =  require('./getSpotifyApi-test.js')

const getUserId = async () => {
    const data = await spotifyApi.getMe();
    const userId = data.body.id;
    return userId;
}

const run = async () => {
    const userId = await getUserId();
    console.log({userId})
}

run()

module.exports = { getUserId };