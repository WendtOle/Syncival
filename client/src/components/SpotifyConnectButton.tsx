import { Button } from "@mui/material";
import { getAuthorizeURL } from "../provider/authorizeURL";

export const SpotifyConnectButton = () => {
  const onClick = async () => {
    const url = await getAuthorizeURL();
    window.location.href = url;
  };
  return (
    <Button variant="outlined" color="success" onClick={onClick} size="small">
      Connect Spotify
    </Button>
  );
};
