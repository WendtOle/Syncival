import { Alert, Snackbar } from "@mui/material";
import { useAtomValue } from "jotai";
import { playlistAtom, playlistSnapShotAtom } from "../state/main";

export const LoadingSnackbar = () => {
  const snapshots = useAtomValue(playlistSnapShotAtom);
  const playlists = useAtomValue(playlistAtom);
  const open = Object.keys(snapshots).length !== Object.keys(playlists).length;
  return (
    <Snackbar
      open={open}
      message="Loading spotify playlists..."
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert severity="info" sx={{ width: "100%", backgroundColor: "#b4e5fa" }}>
        Loading spotify playlists...
      </Alert>
    </Snackbar>
  );
};
