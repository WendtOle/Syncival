import { spotifyApi } from "./getSpotifyApi";
import { getAllItems } from "./utils";
//const {getUserId} = require('./getUserId.ts');
require('dotenv').config();

type Playlist = {owner: {id: string}, id: string, name: string}

export const getPlayListNames = async (): Promise<Array<Omit<Playlist, 'owner'>>> => {
    try {
    //const userId = await getUserId()
    const playlists = await getAllItems(0, [], spotifyApi.getUserPlaylists.bind(spotifyApi))
    const ownPlaylists =  playlists//.filter(playlist => playlist.owner.id === userId);
    console.log(`Found ${ownPlaylists.length} playlists.`)
    return ownPlaylists;
    } catch (err: any) {
        console.log("Error when fetching playlists.")
        console.log(err.body.message)
        return []
    }
}    
