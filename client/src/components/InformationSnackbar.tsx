import { Snackbar } from "@mui/material";
import { useIsLoading } from "../hooks/useIsLoading";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { informationToastAtom } from "../state/main";

export const InformationSnackbar = () => {
  const [informationToast, setInformationToast] = useAtom(informationToastAtom);
  const loadingSnackbarOpen = useIsLoading();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (informationToast && !open) {
      setMessage(informationToast);
      setOpen(true);
    }
  }, [informationToast, open]);

  const onClose = () => {
    setOpen(false);
    setInformationToast(null);
  };

  return (
    <Snackbar
      open={open}
      message={message}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      sx={{ bottom: loadingSnackbarOpen ? 64 : 8 }}
      onClose={onClose}
      autoHideDuration={6000}
    />
  );
};
