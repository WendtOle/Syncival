import { useState } from "react";
import { Festival } from "../types/festival";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { InfoIcon } from "./Icons";

export const FestivalInfoDialogIconButton = (festival: Festival) => {
  const [open, setOpen] = useState(false);
  if (!festival.additionalInformation) {
    return null;
  }
  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <InfoIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{festival.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {festival.additionalInformation}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            style={{ color: "grey", borderColor: "grey" }}
            variant="outlined"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
