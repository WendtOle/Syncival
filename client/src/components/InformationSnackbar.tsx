import { Snackbar } from "@mui/material";
import { useIsLoading } from "../hooks/useIsLoading";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { informationToastAtom } from "../state/main";
import { useExcludedSnackbarOpen } from "../hooks/useExcludedSnackbarOpen";

export const InformationSnackbar = () => {
  const [informationToast, setInformationToast] = useAtom(informationToastAtom);
  const loadingSnackbarOpen = useIsLoading();
  const { isOpen: excludedSnackbarOpen } = useExcludedSnackbarOpen();
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

  console.log({ loadingSnackbarOpen, excludedSnackbarOpen });

  const bottom =
    loadingSnackbarOpen && excludedSnackbarOpen
      ? "120px"
      : loadingSnackbarOpen || excludedSnackbarOpen
      ? "64px"
      : "8px";
  console.log({ bottom });

  return (
    <Snackbar
      open={open}
      message={message}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      sx={{ zIndex: 1000, "&.MuiSnackbar-root": { bottom } }}
      onClose={onClose}
      autoHideDuration={6000}
    />
  );
};
