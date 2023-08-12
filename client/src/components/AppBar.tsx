import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import { AppBarMenu } from "./AppBarMenu";
import SortIcon from "@mui/icons-material/Sort";
import { SortMenuWrapper } from "./SortMenu";
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
          <SortMenuWrapper>
            {(onClick) => (
              <IconButton color="inherit" onClick={onClick}>
                <SortIcon />
              </IconButton>
            )}
          </SortMenuWrapper>
          <AppBarMenu />
        </Toolbar>
      </MuiAppBar>
    </>
  );
};
