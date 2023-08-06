import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Playlists } from "./Playlists";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";
import { useToggleFollowedPlaylists } from "../hooks/useToggleFollowedPlaylists";
import { useAtomValue, useSetAtom } from "jotai";
import {
  filteredPlaylistAmountAtom,
  informationToastAtom,
} from "../state/main";

export const PlaylistDialogButton = ({ onClose }: { onClose: () => void }) => {
  const [open, setOpen] = useState(false);
  const { toggle } = useToggleFollowedPlaylists();
  const setInformationToast = useSetAtom(informationToastAtom);
  const filteredPlaylistAmount = useAtomValue(filteredPlaylistAmountAtom);

  const onCloseDialog = () => {
    setOpen(false);
    onClose();
    setInformationToast(`Selected ${filteredPlaylistAmount} playlists`);
  };

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <MoreHorizIcon />
      </IconButton>
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
