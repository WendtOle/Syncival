import { Typography } from "@mui/material";
import { CONTACT_ADDRESS } from "./AuthenticationWrapper";

export const NotWhitelistedScreen = () => {
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
        <Typography
          variant="h2"
          component="div"
          sx={{ flexGrow: 1, letterSpacing: -4 }}
        >
          Synceval
        </Typography>
        <Typography component="div" sx={{ marginTop: 4, fontSize: 16 }}>
          You authenticated successfully. <br />
          But it seems as if you not granted access yet. <br />
          <br />
          Please contact me through:
          <br />
          {CONTACT_ADDRESS}
        </Typography>
      </div>
    </div>
  );
};
