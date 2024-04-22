import { useAtomValue } from "jotai";
import { authenticationAtom } from "../state/auth";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";

export const NotWhiteListedInformation = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const authenticationState = useAtomValue(authenticationAtom);
  if (authenticationState !== "not-whitelisted") {
    return null;
  }
  return (
    <div>
      <Button
        variant="outlined"
        color="info"
        size="small"
        onClick={() => setDialogOpen(true)}
      >
        Someting went wrong
      </Button>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Something went wrong</DialogTitle>
        <DialogContent>
          <DialogContentText>
            It seems as if you are not whitelisted to use this application.
            <br /> Please contact the developer to get whitelisted.
            <br /> trash+syncival@simplelogin.co
            <br /> <br /> You still can use the application in a limited way.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="info"
            size="small"
            onClick={() => setDialogOpen(false)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
