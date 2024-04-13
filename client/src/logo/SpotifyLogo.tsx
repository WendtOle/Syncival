import { Box, SxProps, Theme } from "@mui/material";

const SPOTIFY_LOGO_MIN_HEIGHT = 21;
export const SpotifyLogo = ({
  variant,
  size: nullableHeight,
  sx,
}: {
  variant?: "black" | "white";
  size?: number;
  sx?: SxProps<Theme>;
}) => {
  const path =
    !variant || variant === "white"
      ? "Spotify_Logo_RGB_White.png"
      : "Spotify_Logo_RGB_Black.png";
  const height = Math.max(nullableHeight ?? 0, SPOTIFY_LOGO_MIN_HEIGHT);
  return (
    <Box sx={sx}>
      <img
        src={path}
        height={`${height}px`}
        alt="spotify logo"
        style={{ padding: `${height / 2}px` }}
      />
    </Box>
  );
};
