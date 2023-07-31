import { Track } from "../state/types"
import "./Playlist.css"
import { useAtomValue } from "jotai"
import { filteredArtistsAtom} from "../state/main"
import { ListItem, ListItemIcon, ListItemText, } from "@mui/material"
import SongIcon from '@mui/icons-material/Audiotrack';

export const SongItem = ({id, name, artists}: Track) => {
    const filteredArtists  = useAtomValue(filteredArtistsAtom)
    const containsLineUpArtist = artists.some(({id: artistId}) => filteredArtists.map(({id}) => id).includes(artistId))

    return (<ListItem key={id} sx={{background: containsLineUpArtist ? "#bffde6" : ""}}>
        <ListItemIcon><SongIcon /></ListItemIcon>
        <ListItemText primary={name} secondary={artists.map(({ name }) => name).join(', ')} /></ListItem>
    )
}