import { List as MuiList } from "@mui/material";
import { useContentHeight } from "../hooks/useContentHeight";
import { useIsPlayerOpen } from "../hooks/useIsPlayerOpen";
import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { scrolledAtom } from "../state/ui";

export const List = ({ children }: { children: any }) => {
  const maxHeight = useContentHeight();
  const isPlayerOpen = useIsPlayerOpen();
  const padding = isPlayerOpen ? 78 : 0;
  const setIsScrolled = useSetAtom(scrolledAtom)

  useEffect(() => {
    const containerRef = document.getElementById("scrollable-auto-tab-list");
    if (!containerRef) {
      return;
    }
    const handleScroll = () => {
      const scrollPosition = containerRef?.scrollTop ?? 0;
      if (scrollPosition > 10) {
        setIsScrolled(true);
        return;
      }
      setIsScrolled(false);
    };
    handleScroll();
    containerRef?.addEventListener("scroll", handleScroll);
    return () => containerRef?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <MuiList
      dense
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        maxHeight: maxHeight - 8 - padding,
        paddingBottom: `${padding}px`,
        "& ul": { padding: 0 },
      }}
      subheader={<li />}
      id="scrollable-auto-tab-list"
    >
      {children}
    </MuiList>
  );
};
