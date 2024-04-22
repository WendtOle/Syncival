import { Theme } from "@emotion/react";
import { Box, SxProps } from "@mui/material";

const SPOTIFY_LOGO_MIN_SIZE = 21;
export const SpotifyIcon = ({
  variant,
  size: nullableSize,
  sx,
}: {
  variant?: "black" | "white";
  size?: number;
  sx?: SxProps<Theme>;
}) => {
  const path =
    !variant || variant === "white"
      ? "Spotify_Icon_RGB_White.png"
      : "Spotify_Icon_RGB_Black.png";
  const size = Math.max(nullableSize ?? 0, SPOTIFY_LOGO_MIN_SIZE);
  return (
    <Box sx={sx}>
      <img
        src={path}
        width={`${size}px`}
        height={`${size}px`}
        alt="spotify logo"
        style={{ padding: `${size / 2}px` }}
      />
    </Box>
  );
};
