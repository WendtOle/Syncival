import { useState } from "react"
import { useAtom } from "jotai"
import { artistForComparisonAtom } from "../state/main"
import { getData } from "../provider/data"
import { dataAtom } from "../state/data"

export const ArtistInput = () => {
    const [artistForComparison, setArtistForComparison] = useAtom(artistForComparisonAtom)
    const [text, setText] = useState("")
    const [data, setData] = useAtom(dataAtom)

    const onChange = (event: any) => {
        const newText = event.target.value
        setText(newText)
        const newArtists = newText.replace(/"/g,'').split(/,|\n/).map((artist: string) => artist.trim()).filter((artist: string) => artist.length > 0)
        setArtistForComparison(newArtists)
    }

    const fetchData = async () => {
        const fetchedData = await getData();
        setData(fetchedData);
    }

    const applyData = (key: string) => {
        const artists = data[key] ?? []
        setArtistForComparison(artists)
        setText(artists.join("\n"))
    }

    const clear = () => {
        setText("")
        setArtistForComparison([])
    }

    return (
        <div className="main-container">
            <h1>Artist input</h1>
            <div className="options">
                <button onClick={clear}>Clear</button>
                <button onClick={() => fetchData()}>Fetch data</button>
            </div>
            
            {Object.entries(data).map(([key, value]) => (
                <div className="options" style={{display: "flex", justifyContent: "space-evenly", alignItems: "center"}} key={key}>
                    "{key}" - {value.length} artists
                    <button onClick={() => applyData(key)}>load</button>
                </div>
            ))}
            
            <div className="options">{artistForComparison.length} artists found</div>
            <div className="scroll-container artist-container">
                {artistForComparison.map((artist: string, index) => (
                    <div className="artist" key={index}>{artist}</div>
                ))}
            </div>
            <label>
                Enter your artists here:
                <textarea rows={6} style={{width: "100%"}} placeholder="Enter your artists here ..." value={text} onChange={onChange}/>
            </label>
            
        </div>
    )
}