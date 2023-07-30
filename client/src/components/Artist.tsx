import { useAtom, useAtomValue } from "jotai";
import { ArtistV2 } from "../state/types";
import { focusedAtom, playlistSongsAtom } from "../state/main";

type ArtistProps = ArtistV2 & {
   foldedOut: boolean;
   setFoldedOut: () => void
}

export const Artist = ({id, tracks, name, foldedOut, setFoldedOut}: ArtistProps) => {
    const [focused, setFocused] = useAtom(focusedAtom)
    const playlistSongs = useAtomValue(playlistSongsAtom)

    const isFocused = focused?.id === id && focused.type === "artist"
    const focusedPlaylistSongIds = (playlistSongs[focused?.id ?? ""] ?? []).map(({id}) => id)
    const containsSongFromFocusedPlaylist = focused?.type === "playlist" && focusedPlaylistSongIds.some((id) => tracks.map(({id: trackId})=> trackId).includes(id))

    const onFocus= (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        if (focused?.id === id) {
            setFocused(null)
            return
        }
        setFocused({id, type: "artist"})
    }

    return (<div className={isFocused || (containsSongFromFocusedPlaylist && !foldedOut) ? " focused artist" : "artist"} key={id} onClick={setFoldedOut}>
    {name} {foldedOut ? <button onClick={onFocus}>focus</button> : `(${tracks.length} songs)`}
    {foldedOut && (
        <div>
            <div className="track-list">{tracks.map(song => (
                <div key={song.id} className={focusedPlaylistSongIds.includes(song.id) ? "song focused" : "song"}>"{song.name}"</div>
            ))}</div>
            
        </div>
        ) }
</div>)
}