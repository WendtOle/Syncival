import { List as MuiList } from "@mui/material";
import { useContentHeight } from "../hooks/useContentHeight";
import { useIsPlayerOpen } from "../hooks/useIsPlayerOpen";

export const List = ({ children }: { children: any }) => {
  const maxHeight = useContentHeight();
  const isPlayerOpen = useIsPlayerOpen();
  const padding = isPlayerOpen ? 78 : 0;
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
    >
      {children}
    </MuiList>
  );
};
