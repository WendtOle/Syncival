import { backendUrl } from "../state/loadEnvVariables"

export const createPlaylist = async (accessToken: string, trackIds: string[]) :Promise<string> => {
    const trackIdParams = trackIds.map(id => `trackId=${id}`).join('&')
    const response = await fetch(`${backendUrl}/createPlaylist?accessToken=${accessToken}&${trackIdParams}`, {method: 'POST'})
    const playlistId = await response.json()
    console.log(playlistId)
    return playlistId.playlistId
}
