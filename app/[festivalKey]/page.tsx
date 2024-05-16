import { Artist } from "../artist";
import {
  festivalDataPath,
  festivalNames,
  isFestival,
} from "../data/festivalInformation";
import ArtistComponent from "./ArtistItem";

export default async function Lineup(params: {
  params: { festivalKey: string };
}) {
  const { festivalKey } = params.params;
  if (!isFestival(festivalKey)) {
    return <div>Unknown festival</div>;
  }
  const artists: Artist[] = Object.values(
    await import(`../data/${festivalDataPath[festivalKey]}`)
  );
  const sortedArtists = artists.sort((a, b) => (a.name < b.name ? -1 : 1));

  return (
    <div>
      <h1>{festivalNames[festivalKey]}</h1>
      <ul>
        {sortedArtists.map((artist, index) => (
          <li key={index}>
            <ArtistComponent artist={artist} />
          </li>
        ))}
      </ul>
    </div>
  );
}
