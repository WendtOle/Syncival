import SpotifyIframe from "../../SpotifyIframe";

export default async function Artist(params: {
  params: { artistKey: string };
}) {
  const { artistKey } = params.params;

  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-spotify-iframe-background sm:bg-white">
      <div className="w-full h-full sm:w-3/4 sm:h-3/4">
        <SpotifyIframe artistKey={artistKey} />
      </div>
    </div>
  );
}
