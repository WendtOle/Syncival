import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useAtom } from "jotai";
import { initialInfoDismissedAtom } from "../state/main";

export const InfoDialog = () => {
  const [dismissed, setDissmised] = useAtom(initialInfoDismissedAtom);
  const dismiss = () => setDissmised(true);
  return (
    <>
      <Dialog open={!dismissed} onClose={dismiss}>
        <DialogTitle>Please import</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please import festival lineups and your spotify playlists first.
          </DialogContentText>
          <DialogContentText>
            Open the sidebar and click TWICE on the download icon in the data
            section.
          </DialogContentText>
          <DialogContentText>
            Sorry for the unconvinience, this will be fixed later.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={dismiss}>
            Dismiss
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
