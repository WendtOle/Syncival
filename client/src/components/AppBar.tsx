import { AppBar as MuiAppBar, Toolbar, Typography } from "@mui/material";
import { AppBarMenu } from "./AppBarMenu";
import { SortMenu } from "./SortMenu";
import { useLineups } from "../hooks/useLineups";
import { useEffect, useRef } from "react";
import { useSetAtom } from "jotai";
import { appBarHeightAtom } from "../state/ui";

export const AppBar = () => {
  const { selected } = useLineups();
  const appBarRef = useRef<any>(null);
  const setAppBarHeight = useSetAtom(appBarHeightAtom);

  useEffect(() => {
    const handleResize = () => {
      const element = appBarRef.current;
      if (!element) {
        return;
      }
      const height = appBarRef.current.clientHeight;
      setAppBarHeight(height);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setAppBarHeight]);

  return (
    <>
      <MuiAppBar position="sticky" ref={appBarRef}>
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
