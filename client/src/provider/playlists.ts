import { backendUrl } from "../state/loadEnvVariables"
import { Playlist } from "../state/types"

export const getPlaylists = async (accessToken: string, page: number) :Promise<Playlist[]> => {
    const response = await fetch(`${backendUrl}/playlists?accessToken=${accessToken}&page=${page}`)
    const playlists = await response.json()
    return playlists
}
