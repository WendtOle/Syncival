import { Dialog } from "@mui/material";
import { useState } from "react";

export const SpotifyIFrameWrapper = ({
  children,
  id,
  type,
}: {
  id: string;
  children: (onClick: () => void) => any;
  type: "track" | "artist" | "playlist";
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {children(() => setOpen(true))}
      <Dialog
        open={open}
        onClose={(e: any) => {
          e.stopPropagation();
          setOpen(false);
        }}
        PaperProps={{
          sx: { backgroundColor: "transparent", borderRadius: "12px" },
        }}
      >
        <iframe
          title={`spotify-snippet-player-${id}`}
          src={`https://open.spotify.com/embed/${type}/${id}?utm_source=generator`}
          width="100%"
          height="352"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          style={{ borderWidth: 0 }}
        ></iframe>
      </Dialog>
    </>
  );
};
