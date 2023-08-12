import {
  IconButton,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useRef } from "react";
import { useSetAtom } from "jotai";
import { appBarHeightAtom } from "../state/ui";
import BackIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";

interface AppBarProps {
  title: string;
  showBackButton?: boolean;
  children?: any;
}

export const AppBar = ({ title, children, showBackButton }: AppBarProps) => {
  const navigate = useNavigate();
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
          {showBackButton && (
            <IconButton
              color="inherit"
              onClick={() => navigate(-1)}
              sx={{ marginRight: 1 }}
            >
              <BackIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component="div"
            color="inherit"
            sx={{ flexGrow: 1, fontWeight: 400, letterSpacing: -0.5 }}
          >
            {title}
          </Typography>
          {children}
        </Toolbar>
      </MuiAppBar>
    </>
  );
};
