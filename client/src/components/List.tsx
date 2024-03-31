import { List as MuiList } from "@mui/material";
import { useContentHeight } from "../hooks/useContentHeight";
import { useIsPlayerOpen } from "../hooks/useIsPlayerOpen";
import { useIsScrolled } from "../hooks/useIsScrolled";

export const List = ({ children }: { children: any }) => {
  const maxHeight = useContentHeight();
  const isPlayerOpen = useIsPlayerOpen();
  const padding = isPlayerOpen ? 78 : 0;
  useIsScrolled("scrollable-auto-tab-list");

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
