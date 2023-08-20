import { List as MuiList } from "@mui/material";
import { useContentHeight } from "../hooks/useContentHeight";

export const List = ({ children }: { children: any }) => {
  const maxHeight = useContentHeight();
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
    >
      {children}
    </MuiList>
  );
};
