import { SpotifyIcon } from "../logo/SpotifyIcon";

export const CoverArt = ({
  imageUrl: nullableImageUrl,
}: {
  imageUrl?: string;
}) => {
  if (!nullableImageUrl) {
    return <SpotifyIcon variant="black" size={28} />;
  }

  return (
    <img
      src={nullableImageUrl}
      alt="cover art"
      height="54px"
      width="54px"
      style={{ border: "1px solid rgb(40,40,40,0.1)" }}
    />
  );
};
