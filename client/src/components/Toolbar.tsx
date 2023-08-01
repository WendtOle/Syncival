import { Paper, Toolbar as MuiToolbar, Divider } from "@mui/material";

export const Toolbar = ({ children }: { children: any }) => {
  return (
    <>
      <Paper
        sx={{
          position: "sticky",
          top: 56,
          zIndex: 1000,
          backgroundColor: "white",
        }}
      >
        <MuiToolbar sx={{ justifyContent: "end" }}>{children}</MuiToolbar>
      </Paper>
      <Divider />
    </>
  );
};
