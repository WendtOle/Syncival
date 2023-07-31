
import PlaylistIcon from '@mui/icons-material/Folder';
import { Badge } from '@mui/material';
import { useAtomValue } from 'jotai';
import { excludedPlaylistIdsAtom, playlistsAtom } from '../state/main';

export const PlaylistNavigationIcon = () => {
    const allPlaylists = useAtomValue(playlistsAtom)
    const excludedPlaylistId = useAtomValue(excludedPlaylistIdsAtom)
    const selectedPlaylists = allPlaylists.filter(({id}) => !excludedPlaylistId.includes(id))

    return (<Badge badgeContent={selectedPlaylists.length} color="info">
        <PlaylistIcon />
        </Badge>)
}