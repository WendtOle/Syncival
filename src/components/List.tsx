import { List as MuiList } from "@mui/material";
import { useContentHeight } from "../hooks/useContentHeight";
import { useIsScrolled } from "../hooks/useIsScrolled";

export const List = ({ children }: { children: any }) => {
  const maxHeight = useContentHeight();
  useIsScrolled("scrollable-auto-tab-list");

  return (
    <MuiList
      dense
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        maxHeight: maxHeight - 8,
        "& ul": { padding: 0 },
      }}
      subheader={<li />}
      id="scrollable-auto-tab-list"
    >
      {children}
    </MuiList>
  );
};
