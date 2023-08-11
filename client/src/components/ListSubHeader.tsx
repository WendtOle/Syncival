import { ListSubheader, ListItemButton } from "@mui/material";

export const ListSubHeader = ({
  onClick,
  name,
}: {
  onClick: () => void;
  name: string;
}) => {
  return (
    <ListSubheader sx={{ backgroundColor: "#f6f6f6", ":hover": "#f5f5f5" }}>
      <ListItemButton
        disableGutters
        onClick={onClick}
        sx={{
          color: "black",
          fontSize: "1.1rem",
          fontWeight: 300,
          letterSpacing: -0.5,
        }}
      >
        {name}
      </ListItemButton>
    </ListSubheader>
  );
};
