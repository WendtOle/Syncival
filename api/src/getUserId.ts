import { spotifyApi } from "./getSpotifyApi";

export const getUserId = async () => {
    const data = await spotifyApi.getMe();
    const userId = data.body.id;
    return userId;
}

