
import { spotifyApi } from './getSpotifyApi';
import { getUserId } from './getUserId';
const url = require('url');
const querystring = require('querystring');
import { toRecord } from "./toRecord";

export const sendPlaylists = async (req: any, res: any) => {
    const { query } = url.parse(req.url);
    const { accessToken, page } = querystring.parse(query);
    try {
        await spotifyApi.setAccessToken(accessToken);
        const userId = await getUserId()
        
        const playlists = await spotifyApi.getUserPlaylists({limit: 50, offset: page * 50})
        const processedPlaylists = playlists.body.items.map((playlist: SpotifyApi.PlaylistObjectSimplified) => {
            const image = playlist.images.reduce((smallest: any, image: any) => {
                if (image.height < smallest.height) return image
                return smallest
            }, playlist.images[0])
            return ({
                name: playlist.name,
                id: playlist.id,
                isOwn: playlist.owner.id === userId,
                trackAmount: playlist.tracks.total,
                snapShotId: playlist.snapshot_id,
                imageUrl: image?.url
            });
        })
        res.send(toRecord(processedPlaylists, (playlist) => playlist.id));
        return
    } catch (err: any) {
        console.log("Error when fetching playlists.")
        console.log(err.body.message)
        res.send('error')
        return
    }  
}