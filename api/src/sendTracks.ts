import { spotifyApi } from "./getSpotifyApi";

const url = require('url');
const querystring = require('querystring');

type Something = Array<{id: string, name: string, artists: Array<{name: string, id: string}>, imageUrl?: string, albumName: string}>

export const sendTracks = async (req: any, res: any) => {
    const { query } = url.parse(req.url);
    const { accessToken, page, playlistId } = querystring.parse(query);
    try {
        await spotifyApi.setAccessToken(accessToken);
        console.log('/tracks', {playlistId, page})
        const getResponse = () => {
            if (playlistId === 'liked_songs') {
                return spotifyApi.getMySavedTracks({limit: 50, offset: page * 50})
            }
            return spotifyApi.getPlaylistTracks(playlistId,{limit: 50, offset: page * 50})
        }
        const response = await getResponse()
        const trackData: Something = response.body.items.map(({track}) => track).filter(track => track !== null).map(({id, name, artists, album}: any) => {
            const image = album.images.reduce((smallest: any, image: any) => {
                if (image.height < smallest.height) return image
                return smallest
            }, album.images[0])
            return {id, name, artists: artists.map(({name, id}: SpotifyApi.ArtistObjectSimplified) => ({name, id})), imageUrl: image?.url, albumName: album.name}
        })
        res.send(trackData);
        return
    } catch (err: any) {
        console.log(`Error when fetching playlist tracks. "${playlistId}"`)
        console.log(err)
        res.send('error')
        return
    }  
}