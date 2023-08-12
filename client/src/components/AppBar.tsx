import { AppBar as MuiAppBar, Toolbar, Typography } from "@mui/material";
import { AppBarMenu } from "./AppBarMenu";
import { SortMenu } from "./SortMenu";
import { useLineups } from "../hooks/useLineups";

export const AppBar = () => {
  const { selected } = useLineups();
  return (
    <>
      <MuiAppBar position="sticky">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component="div"
            color="inherit"
            sx={{ flexGrow: 1, fontWeight: 400, letterSpacing: -0.5 }}
          >
            {selected?.name ?? "No lineup selected"}
          </Typography>
          <SortMenu />
          <AppBarMenu />
        </Toolbar>
      </MuiAppBar>
    </>
  );
};
