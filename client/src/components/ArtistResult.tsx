import { useState } from "react"
import { createPlaylist } from "../provider/createPlaylist"
import { useAtom } from "jotai"
import { filteredArtistsAtom, artistForComparisonAtom } from "../state/main"
import { accessTokenAtom } from "../state/auth"
import { Artist } from "./Artist"

export const ArtistResult = () => {
    const [accessToken] = useAtom(accessTokenAtom)
    const [artistForComparison] = useAtom(artistForComparisonAtom)
    const [filteredArtists]  = useAtom(filteredArtistsAtom)
    const [foldedOutArtists, setFoldedOutArtists] = useState<string | undefined>()
    const [sort, setSort] = useState<"tracks" | "alphabetically">("tracks")

    const createPlaylistFromFilteredTracks = () => {
        if (filteredArtists.length === 0) {
            return
        }
        return createPlaylist(accessToken(), filteredArtists.map(({tracks}) => tracks[0].id))
    }

    const sortedArtists = filteredArtists.sort((a, b) => {
        if (sort === "tracks") {
            return b.tracks.length - a.tracks.length
        }
        return a.name.localeCompare(b.name)
    })

    return (<div>
        <div className="options">
            <button  onClick={createPlaylistFromFilteredTracks}>Create playlist from artists</button>
        </div>
        <div className="options">
            <button onClick={() => setSort("tracks")} className={sort ===  "tracks" ? "active" : ""}>Sort by tracks</button>
            <button onClick={() => setSort("alphabetically")} className={sort === "alphabetically" ? "active" : ""}>Sort alphabetically</button>
        </div>
        <div className="options">{filteredArtists.length} / {artistForComparison.length} artists matched</div>
        <div className="scroll-container">
            <div>{sortedArtists.map((artist) => (
                <Artist key={artist.id} {...artist} foldedOut={foldedOutArtists === artist.id} setFoldedOut={() => setFoldedOutArtists(foldedOutArtists === artist.id ? undefined : artist.id)}/>
        ))}</div>
        </div>
        
    </div>)
}