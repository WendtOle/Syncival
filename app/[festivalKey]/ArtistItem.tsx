import { Artist, isSpotifyArtist } from "../artist";

export default async function ArtistComponent({ artist }: { artist: Artist }) {
  if (!isSpotifyArtist(artist)) {
    return (
      <div className="flex items-center mx-2 mb-1">
        <div className="w-16 h-16 flex justify-center items-center bg-gray-100">
          <p className="font-medium text-lg">?</p>
        </div>
        <p className="ml-4"> {artist.name}</p>
      </div>
    );
  }
  const image: SpotifyApi.ImageObject | undefined =
    artist.images[artist.images.length - 1];
  return (
    <div className="flex items-center mx-2 mb-1">
      <img src={image?.url ?? ""} width={64} height={64} />
      <p className="ml-4">{artist.name}</p>
    </div>
  );
}
