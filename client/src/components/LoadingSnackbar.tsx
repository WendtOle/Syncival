import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { useIsLoading } from "../hooks/useIsLoading";

export const LoadingSnackbar = () => {
  const open = useIsLoading();

  const bottom = "8px";
  return (
    <Snackbar
      open={open}
      message="Loading spotify playlists..."
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      sx={{ zIndex: 1000, "&.MuiSnackbar-root": { bottom } }}
    >
      <Alert
        severity="info"
        sx={{ width: "100%", backgroundColor: "#b4e5fa" }}
        icon={<CircularProgress size="1.3rem" />}
      >
        Loading spotify playlists...
      </Alert>
    </Snackbar>
  );
};
