const {spotifyApi} =  require('./getSpotifyApi.js')

const getUserId = async () => {
    const data = await spotifyApi.getMe();
    const userId = data.body.id;
    return userId;
}

module.exports = { getUserId };