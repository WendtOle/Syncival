import { spotifyApi } from "./getSpotifyApi";

export const checkAccessTokenValid = async (accessToken: string): Promise<void> => {
    spotifyApi.setAccessToken(accessToken);
    const test = await spotifyApi.getMe();
}