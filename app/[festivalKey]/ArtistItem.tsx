import { Artist, isSpotifyArtist } from "../artist";

export default async function ArtistComponent({ artist }: { artist: Artist }) {
  if (!isSpotifyArtist(artist)) {
    return (
      <div className="flex">
        <div className="w-16 h-16 content-center">
          <p>{artist.name?.[0]}</p>
        </div>
        <p>{artist.name} (not found on spotify)</p>
      </div>
    );
  }
  const image: SpotifyApi.ImageObject | undefined =
    artist.images[artist.images.length - 1];
  return (
    <div className="flex">
      <img src={image?.url ?? ""} width={64} />
      <p>{artist.name}</p>
    </div>
  );
}
