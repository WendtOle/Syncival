import { Chip, Container, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { useLineups } from "../../hooks/useLineups";
import { AppBar } from "../AppBar";
import { ClearIcon, SaveIcon } from "../Icons";
import { SubmitDialog } from "../dialogs/SubmitDialog";
import { useNavigate } from "react-router-dom";
import { SubmitDialogWithTextInput } from "../dialogs/SubmitDialogWithTextInput";

export const LinueupCreationScreen = () => {
  const [text, setText] = useState("");
  const { add } = useLineups();
  const navigate = useNavigate();

  const parsedArtists = text
    .replace(/"/g, "")
    .split(/,|\n/)
    .map((artist: string) => artist.trim())
    .filter((artist: string) => artist.length > 0);

  const canAddLineup = parsedArtists.length > 0;

  const addLineUp = (lineupName: string) => {
    add({ name: lineupName, artists: parsedArtists });
    navigateBack();
  };

  const navigateBack = () => navigate(-1);

  const abortButton = canAddLineup ? (
    <SubmitDialog
      onSubmit={navigateBack}
      title="Abort lineup creation?"
      submitText="Abort"
    >
      {(onClick) => (
        <IconButton color="inherit" onClick={onClick}>
          <ClearIcon />
        </IconButton>
      )}
    </SubmitDialog>
  ) : (
    <IconButton color="inherit" onClick={navigateBack}>
      <ClearIcon />
    </IconButton>
  );

  return (
    <>
      <AppBar title="Add Lineup" customNavigationButton={abortButton}>
        {canAddLineup && (
          <SubmitDialogWithTextInput onSubmit={addLineUp}>
            {(onClick) => (
              <IconButton onClick={onClick} color="inherit">
                <SaveIcon />
              </IconButton>
            )}
          </SubmitDialogWithTextInput>
        )}
      </AppBar>
      <Container>
        <TextField
          placeholder="Enter your artists here ..."
          label="Artists"
          value={text}
          variant="outlined"
          onChange={(event) => setText(event.target.value)}
          fullWidth
          sx={{ marginTop: 2 }}
          maxRows={10}
          multiline
        />

        <div style={{ margin: 5, marginTop: 10 }}>
          {parsedArtists.map((artist: string, index) => (
            <Chip
              key={index}
              size="small"
              label={artist}
              sx={{ margin: 0.2, padding: "0px 1px" }}
            />
          ))}
        </div>
      </Container>
    </>
  );
};
