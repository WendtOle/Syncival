import { Playlists } from "./Playlists"
import { ArtistResult } from "./ArtistResult"
import { ArtistInput } from "./ArtistInput"
import "./App.css"

export const App = () => {
    return (
        <div className="App">
            <Playlists />
            <ArtistInput/>
            <ArtistResult/>
        </div>
    )
}