import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

export const SubmitDialogWithTextInput = ({
  children,
  onSubmit,
}: {
  children: (onClick: () => void) => any;
  onSubmit: (text: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  return (
    <>
      {children(() => setOpen(true))}
      <Dialog open={open}>
        <DialogTitle>Enter lineup name</DialogTitle>
        <DialogContent>
          <TextField
            placeholder="Lineup name"
            value={text}
            size="small"
            onChange={(e) => setText(e.currentTarget.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            disabled={text.length === 0}
            onClick={() => {
              setOpen(false);
              onSubmit(text);
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
