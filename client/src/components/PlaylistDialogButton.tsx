import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Playlists } from "./Playlists";
import { useState } from "react";
import { useToggleFollowedPlaylists } from "../hooks/useToggleFollowedPlaylists";
import { useSetAtom } from "jotai";
import { informationToastAtom } from "../state/main";

export const PlaylistDialogButton = ({
  onClose,
  children,
}: {
  onClose: () => void;
  children: (onClick: () => void) => any;
}) => {
  const [open, setOpen] = useState(false);
  const { toggle } = useToggleFollowedPlaylists();
  const setInformationToast = useSetAtom(informationToastAtom);

  const onCloseDialog = () => {
    setOpen(false);
    onClose();
    setInformationToast(`Selected TODO ... playlists`);
  };

  return (
    <>
      {children(() => setOpen(true))}
      <Dialog open={open} onClose={onCloseDialog}>
        <DialogTitle>Spotify playlists</DialogTitle>
        <DialogContent>
          <Playlists />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={toggle}>
            Toggle followed
          </Button>
          <Button variant="outlined" onClick={onCloseDialog}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
