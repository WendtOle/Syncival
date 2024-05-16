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
  const artists = (await import(
    `../data/${festivalDataPath[festivalKey]}`
  )) as Array<Artist>;
  return (
    <div>
      <h1>{festivalNames[festivalKey]}</h1>
      <ul>
        {Object.values(artists).map((artist, index) => (
          <li key={index}>
            <ArtistComponent artist={artist} />
          </li>
        ))}
      </ul>
    </div>
  );
}
