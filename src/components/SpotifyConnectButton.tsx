import { Button } from "@mui/material";
import { getAuthorizeURL } from "../provider/authorizeURL";
import { useAtomValue } from "jotai";
import { authenticationAtom } from "../state/auth";

export const SpotifyConnectButton = () => {
  const authenticationState = useAtomValue(authenticationAtom);
  if (authenticationState !== "not-authenticated") {
    return null;
  }
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
