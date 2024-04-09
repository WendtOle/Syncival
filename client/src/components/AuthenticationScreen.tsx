import Typography from "@mui/material/Typography";
import { DebugAuthDialogWrapper } from "./DebugAuthDialogWrapper";
import Button from "@mui/material/Button";
import { getAuthorizeURL } from "../provider/authorizeURL";
import { useLocation } from "react-router-dom";

export const AuthenticationScreen = () => {
  const { search } = useLocation();

  const query = new URLSearchParams(search);
  const showLogin = query.get("showLogin") === "true";

  const onClick = async () => {
    const url = await getAuthorizeURL();
    window.location.href = url;
  };

  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          height: "20vh",
          justifyItems: "baseline",
          textAlign: "center",
        }}
      >
        <DebugAuthDialogWrapper>
          <Typography
            variant="h2"
            component="div"
            sx={{ flexGrow: 1, letterSpacing: -4 }}
          >
            Synceval
          </Typography>
        </DebugAuthDialogWrapper>
        <Typography sx={{ marginTop: 4, fontSize: 16 }}>
          Our app is in development. <br />
          Contact us to get early access and start the journey!
          <br />
          <br />
          Please contact me through: <br />
          ow-ad+artist-lookup@simplelogin.co
        </Typography>
        {showLogin && (
          <div style={{ position: "fixed", bottom: 0, width: "100%" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={onClick}
              style={{ marginBottom: 16 }}
            >
              Connect with Spotify
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
