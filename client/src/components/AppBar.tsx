import {
  Box,
  IconButton,
  LinearProgress,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useRef } from "react";
import { useSetAtom } from "jotai";
import { appBarHeightAtom } from "../state/ui";
import BackIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import { useIsLoading } from "../hooks/useIsLoading";
import { SpotifyLogo } from "../SpotifyLogo";

interface AppBarProps {
  title: string;
  shortTitle?: string;
  showBackButton?: boolean;
  customNavigationButton?: JSX.Element;
  children?: any;
}

export const AppBar = ({
  title,
  shortTitle,
  children,
  showBackButton,
  customNavigationButton,
}: AppBarProps) => {
  const navigate = useNavigate();
  const appBarRef = useRef<any>(null);
  const isLoading = useIsLoading();
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
      <MuiAppBar
        position="sticky"
        ref={appBarRef}
        sx={{ "&.MuiAppBar-root": { boxShadow: "none" } }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box>
            {customNavigationButton}
            {!customNavigationButton && showBackButton && (
              <IconButton color="inherit" onClick={() => navigate(-1)}>
                <BackIcon />
              </IconButton>
            )}
          </Box>

          <Typography
            variant="h6"
            component="div"
            color="inherit"
            sx={{ flexGrow: 1, fontWeight: 400, letterSpacing: -0.5 }}
          >
            {!shortTitle ? (
              <div>{title}</div>
            ) : (
              <>
                <Box sx={{ display: { sm: "none" } }}>{shortTitle}</Box>
                <Box sx={{ display: { xs: "none", sm: "block" } }}>{title}</Box>
              </>
            )}
          </Typography>
          <SpotifyLogo size={24} variant="black" />
          {children}
        </Toolbar>
        {isLoading && <LinearProgress color="primary" />}
      </MuiAppBar>
    </>
  );
};
