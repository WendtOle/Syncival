import Item from "../Item";
import { Artist, isSpotifyArtist } from "../artist";

export default async function ArtistComponent({ artist }: { artist: Artist }) {
  if (!isSpotifyArtist(artist)) {
    return (
      <Item
        title={artist.name}
        image={
          <div className="w-16 h-16 flex justify-center items-center bg-gray-100">
            <p className="font-medium text-lg">?</p>
          </div>
        }
      />
    );
  }
  const image: SpotifyApi.ImageObject | undefined =
    artist.images[artist.images.length - 1];
  return (
    <Item
      title={artist.name}
      image={<img src={image?.url ?? ""} width={64} height={64} />}
    />
  );
}
