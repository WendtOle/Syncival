const {spotifyApi} =  require('./getSpotifyApi.ts')

export const getUserId = async () => {
    const data = await spotifyApi.getMe();
    const userId = data.body.id;
    return userId;
}

