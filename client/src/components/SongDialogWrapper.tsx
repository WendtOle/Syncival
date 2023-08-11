import { Dialog } from "@mui/material"
import { useState } from "react"

export const SongDialogWrapper = ({children, id}: {id: string, children: (onClick: () => void) => any}) => {
    const [open, setOpen] = useState(false)
    return (
        <>
        {children(() => setOpen(true))}
        <Dialog open={open} onClose={() => setOpen(false)}>
        <iframe title={`spotify-snippet-player-${id}`} src={`https://open.spotify.com/embed/track/${id}?utm_source=generator`} width="100%" height="352"  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

        </Dialog>
        </>
    )
}