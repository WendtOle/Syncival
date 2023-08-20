import { AppBar, IconButton } from "@mui/material";
import { useAtom } from "jotai";
import { spotifyTrackIdAtom } from "../state/ui";
import { CloseIcon } from "./Icons";

export const BottomSpotifyPlayer = () => {
  const [spotifyId, setSpotifyId] = useAtom(spotifyTrackIdAtom);
  if (!spotifyId) return null;

  const onClose = () => {
    setSpotifyId(null);
  };

  return (
    <AppBar
      sx={{
        bottom: 0,
        top: "auto",
        background: "transparent",
        boxShadow: "none",
      }}
      position="fixed"
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "90vw", maxWidth: "500px", position: "relative" }}>
          <IconButton
            sx={{
              position: "absolute",
              left: -10,
              top: -10,
              backgroundColor: "rgb(40,40,40)",
              color: "white",
              border: "1px solid rgb(150,150,150)",
              width: "24px",
              height: "24px",
              "&:hover": {
                backgroundColor: "rgb(60,60,60)",
              },
            }}
            onClick={onClose}
          >
            <CloseIcon sx={{ width: "18px" }} />
          </IconButton>
          <iframe
            title={`spotify-bottom-player`}
            id="spotify-iframe"
            src={`https://open.spotify.com/embed/track/${spotifyId}?utm_source=generator`}
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{
              borderWidth: 0,
              height: "80px",
            }}
          ></iframe>
        </div>
      </div>
    </AppBar>
  );
};
