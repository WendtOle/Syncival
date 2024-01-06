import { spotifyApi } from "./getSpotifyApi";

interface GetMySavedTracksProps {
    accessToken: string, 
    limit: number, 
    page: number
}

export const getMySavedTracks = async ({accessToken, limit, page}: GetMySavedTracksProps): Promise<SpotifyApi.SavedTrackObject[]> => {
    spotifyApi.setAccessToken(accessToken);
    const data = await spotifyApi.getMySavedTracks({limit, offset: page * 50});
    return data.body.items;
}