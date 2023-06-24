import { spotifyApi } from "./getSpotifyApi";
//const {spotifyApi} =  require('./getSpotifyApi.ts')
const {getUserId} = require('./getUserId.ts');
require('dotenv').config();

const LIMIT = 50

type Playlist = {owner: {id: string}, id: string, name: string}

export const getPlayListNames = async (): Promise<Array<Omit<Playlist, 'owner'>>> => {
    const userId = await getUserId()

    const something = async (i: number, playlists: Array<Playlist>): Promise<Array<Playlist>> => {
        const data = await spotifyApi.getUserPlaylists({limit: LIMIT, offset: i * LIMIT});
        const currentPlaylists = data.body.items;
        playlists.push(...currentPlaylists);
        if (currentPlaylists.length === 0) {
            return playlists
        }
        return something(i + 1, playlists)
    }
    const playlists = await something(0, [])
    const ownPlaylists =  playlists//.filter(playlist => playlist.owner.id === userId);
    console.log(`Found ${ownPlaylists.length} playlists.`)
    return ownPlaylists;
}    

