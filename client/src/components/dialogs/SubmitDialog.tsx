import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useState } from "react";

export const SubmitDialog = ({
  children,
  onSubmit,
  title,
  submitText,
}: {
  children: (onClick: () => void) => any;
  onSubmit: () => void;
  title: string;
  submitText: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {children(() => setOpen(true))}
      <Dialog open={open}>
        <DialogTitle>{title}</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              setOpen(false);
              onSubmit();
            }}
          >
            {submitText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
