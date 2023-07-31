import { useState } from "react"
import { createPlaylist } from "../provider/createPlaylist"
import { useAtom } from "jotai"
import { filteredArtistsAtom } from "../state/main"
import { accessTokenAtom } from "../state/auth"
import { Artist } from "./Artist"
import { AppBar, Button, Fab, List, Toolbar, Typography } from "@mui/material"
import FavouriteIcon from '@mui/icons-material/Favorite';
import { ArtistItem } from "./ArtistItem"


export const ArtistResult = () => {
    const [accessToken] = useAtom(accessTokenAtom)
    const [filteredArtists]  = useAtom(filteredArtistsAtom)
    const [foldedOutArtists, setFoldedOutArtists] = useState<string | undefined>()
    const [sort, setSort] = useState<"tracks" | "alphabetically">("tracks")

    const createPlaylistFromFilteredTracks = async () => {
        if (filteredArtists.length === 0) {
            return
        }
        const playlistId = await createPlaylist(accessToken(), filteredArtists.map(({tracks}) => tracks[0].id))
        console.log({playlistId})
        const link = `spotify:playlist:${playlistId}`
        window.open(link, '_blank')
    }

    const sortedArtists = filteredArtists.sort((a, b) => {
        if (sort === "tracks") {
            return b.tracks.length - a.tracks.length
        }
        return a.name.localeCompare(b.name)
    })
    /*
     <div className="options">
            <button  onClick={createPlaylistFromFilteredTracks}>Create playlist from artists</button>
        </div>
        <div className="options">
            <button onClick={() => setSort("tracks")} className={sort ===  "tracks" ? "active" : ""}>Sort by tracks</button>
            <button onClick={() => setSort("alphabetically")} className={sort === "alphabetically" ? "active" : ""}>Sort alphabetically</button>
        </div>*/

    return (<div>
       <AppBar position="sticky"> 
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>Matched Artists</Typography>
                    <Button variant="outlined" color="inherit" onClick={createPlaylistFromFilteredTracks}>Create playlist</Button>
                </Toolbar>
            </AppBar>
        <List dense>
            {sortedArtists.map((artist) => (
                <ArtistItem key={artist.id} {...artist} expandedArtist={foldedOutArtists} setExpandedArtist={setFoldedOutArtists}/>
        ))}
        </List>
    </div>)
}