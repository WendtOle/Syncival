import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useState } from "react";

export const SubmitDialog = ({
  children,
  onSubmit,
}: {
  children: (onClick: () => void) => any;
  onSubmit: () => void;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {children(() => setOpen(true))}
      <Dialog open={open}>
        <DialogTitle>Abort lineup creation?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              setOpen(false);
              onSubmit();
            }}
          >
            Abort
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
