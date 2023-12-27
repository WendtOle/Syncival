import { spotifyApi } from "./getSpotifyApi";

const url = require('url');
const querystring = require('querystring');

export const createPlaylist = async (req: any, res: any) => {
    const { query } = url.parse(req.url);
    const { accessToken, trackId, lineupName, playlistId, lineupKey} = querystring.parse(query);
    try {
        await spotifyApi.setAccessToken(accessToken);
        const id = playlistId ?? await subCreatePlaylist(lineupName,lineupKey)
        const params = trackId.map((id: string) => `spotify:track:${id}`)
        await spotifyApi.replaceTracksInPlaylist(id, [])
        // I guess that not more than x tracks can be added to a playlist at once
        for (let i = 0; i < params.length; i += 50) {
            const paramsSlice = params.slice(i, i + 50)
            await spotifyApi.addTracksToPlaylist(id, paramsSlice)
        }
        res.send({playlistId: id});
        return
    } catch (err: any) {
        console.log("Error when creating playlist.")
        console.log(err)
        res.send({status: 'error'})
        return
    }
}

const timeStamp = () => {
    const date = new Date();
    const day = date.getDate().toString();
    const month = (date.getMonth() + 1).toString();
    const hour = date.getHours().toString();
    const minute = date.getMinutes().toString();
    return `${day}.${month}-${hour}:${minute}`
}

const subCreatePlaylist = async (lineupName: string, key: string ) => {
    const name = `ArtistLookup - ${lineupName} [${key}]`
    const response_createPlaylist = await spotifyApi.createPlaylist(name, {public: false, description: `Playlist created by ArtistLookup at ${timeStamp()}`})
    const {id} = response_createPlaylist.body
    return id
}