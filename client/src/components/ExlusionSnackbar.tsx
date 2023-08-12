import { Button, Snackbar } from "@mui/material";
import { useExcludedInfo } from "../hooks/useExcludedInfo";
import { useNavigate } from "react-router-dom";
import { useExcludedSnackbarOpen } from "../hooks/useExcludedSnackbarOpen";

export const ExlusionSnackbar = () => {
  const { playlists, songs } = useExcludedInfo();
  const { isOpen, close } = useExcludedSnackbarOpen();
  const navigate = useNavigate();

  const onClose = (e: any) => {
    e.stopPropagation();
    close();
  };

  return (
    <Snackbar
      open={isOpen}
      message={`${playlists} playlists with ${songs} songs excluded`}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      sx={{ zIndex: 1000, "&.MuiSnackbar-root": { bottom: "8px" } }}
      color="primary"
      onClick={() => navigate("/exclude")}
      action={
        <Button sx={{ color: "white" }} size="small" onClick={onClose}>
          Hide
        </Button>
      }
      ContentProps={{
        sx: { color: "white", backgroundColor: "rgb(237, 108, 2)" },
      }}
    />
  );
};
