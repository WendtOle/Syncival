import { Box, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { useLineups } from "../../hooks/useLineups";
import { AppBar } from "../AppBar";
import { DeleteIcon } from "../Icons";
import { SubmitDialog } from "../dialogs/SubmitDialog";
import { useNavigate } from "react-router-dom";
import { LineupInspectionInformationDialog } from "../dialogs/LineupInspectionInformationDialog";

export const LineupInspectionScreen = () => {
  const { deleteSelected, selected } = useLineups();
  const navigate = useNavigate();

  const onDelete = () => {
    deleteSelected();
    navigateBack();
  };

  const navigateBack = () => navigate(-1);

  return (
    <>
      <AppBar
        shortTitle="Inspect Lineup"
        title={`Lineup "${selected?.name ?? ""}" (${
          selected?.artists.length ?? "??"
        } artists)`}
        showBackButton
      >
        <SubmitDialog
          onSubmit={onDelete}
          title="Delete lineup?"
          submitText="Delete"
        >
          {(onClick) => (
            <IconButton onClick={onClick} color="inherit">
              <DeleteIcon />
            </IconButton>
          )}
        </SubmitDialog>
        <Box sx={{ display: { sm: "none" } }}>
          <LineupInspectionInformationDialog />
        </Box>
      </AppBar>
      <List dense>
        {(selected?.artists ?? [])
          .sort((a, b) => (a > b ? 1 : -1))
          .map((artist, index) => (
            <ListItem key={artist + index}>
              <ListItemText primary={artist} />
            </ListItem>
          ))}
      </List>
    </>
  );
};
