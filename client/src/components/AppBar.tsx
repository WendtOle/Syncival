import {
  Box,
  IconButton,
  LinearProgress,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useRef } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { appBarHeightAtom, scrolledAtom } from "../state/ui";
import BackIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import { useIsLoading } from "../hooks/useIsLoading";
import { SpotifyIcon } from "../logo/SpotifyIcon";
import { SpotifyLogo } from "../logo/SpotifyLogo";

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
  const isScrolled = useAtomValue(scrolledAtom)

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
        style={{backgroundColor: isScrolled ? "#fff9c4" : "white", transition: "background-color 0.7s ease"}}
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
          
          <Box sx={{position: "fixed", width: "100%", display: "flex", justifyContent: "center", zIndex: -1}}>
              <SpotifyIcon size={24} variant="black" sx={{ display: { sm: "none" } }}/>
              <SpotifyLogo height={24} variant="black" sx={{ display: { xs: "none", sm: "block" } }}/>
          </Box>
          
          <Box>
            {children}
          </Box>
          
        </Toolbar>
        {isLoading && <LinearProgress color="inherit" />}
      </MuiAppBar>
    </>
  );
};
