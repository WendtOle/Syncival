import { useEffect, useState } from "react"

export const LikedSongsArtists = () => {
    const [artists, setArtists] = useState<string[]>([])
    const accessToken = localStorage.getItem('accessToken')

    if (!accessToken) {
        throw Error("No tokens")
    }

    useEffect(() => {
        const outerMethod = async () => {
            const method = async (page: number) => {
                const response = await fetch(`http://localhost:8888/liked?accessToken=${accessToken}&page=${page}`)
                const artists = await response.json()
                if (artists.length === 0) {
                    return
                }
                setArtists(curr => [...curr, ...artists])
                method(page + 1)
                return
            }
            method(0)
        }
        outerMethod()
    }, [])

    const uniqueAritsts = [...new Set(artists)]

    return (
        <div>Artist amount: {uniqueAritsts.length}</div>
    )
}