export default function SpotifyIframe({
  artistKey,
}: Readonly<{ artistKey: string }>) {
  const type = "artist";
  return (
    <iframe
      title={`spotify-snippet-player-${artistKey}`}
      id="spotify-iframe"
      src={`https://open.spotify.com/embed/${type}/${artistKey}?utm_source=generator&theme=0`}
      width="100%"
      height="100%"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      style={{ borderWidth: 0 }}
    ></iframe>
  );
}
