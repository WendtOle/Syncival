import { Dialog, DialogTitle, IconButton } from "@mui/material";
import { useState } from "react";
import { CloseIcon } from "./Icons";

export const SpotifyIFrameWrapper = ({
  children,
  id,
  type,
}: {
  id: string;
  children: (onClick: () => void) => any;
  type: "artist" | "playlist";
}) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      {children(onOpen)}
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            backgroundColor: "rgb(40,40,40)",
            borderRadius: 2,
            paddingLeft: 1,
            paddingBottom: 2,
            height: "75vh",
            width: "85vw",
            maxWidth: "800px",
            maxHeight: "600px",
          },
        }}
      >
        <DialogTitle
          sx={{
            justifyContent: "end",
            "&.MuiDialogTitle-root": { display: "flex", padding: 0 },
          }}
        >
          <IconButton
            sx={{
              paddingRight: 2,
              paddingTop: 2,
              paddingBottom: 0,
              color: "white",
              "&:hover": { color: "green" },
            }}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <iframe
          title={`spotify-snippet-player-${id}`}
          id="spotify-iframe"
          src={`https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`}
          width="100%"
          height="100%"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          style={{ borderWidth: 0 }}
        ></iframe>
      </Dialog>
    </>
  );
};
