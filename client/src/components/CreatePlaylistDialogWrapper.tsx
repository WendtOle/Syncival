import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";
import { useCreatePlaylist } from "../hooks/useCreatePlaylist";

export const CreatePlaylistDialogWrapper = ({children}: {children: (onClick: () => void) => any} ) => {
    const [songSelection, setSongSelection] = useState<"all" | "one">("one");
    const [open, setOpen] = useState(false);
    const create = useCreatePlaylist();

    const onCreate = async () => {
        await create(songSelection)();
        setOpen(false);
    };

    return (<>
        {children(() => setOpen(true))}
        <Dialog open={open} maxWidth="xs" onClose={() => setOpen(false)}>
            <DialogTitle>Create playlist</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    A spotify playlist will be created with songs which matched with the
                    selected lineup.
                </DialogContentText>
                <FormControl sx={{ marginTop: 2 }}>
                    <FormLabel id="demo-radio-buttons-group-label">Song selection</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={songSelection}
                        name="radio-buttons-group"
                        onChange={(e) => setSongSelection(e.target.value as any)}
                    >
                        <FormControlLabel value="one" control={<Radio />} label="One per artist" />
                        <FormControlLabel value="all" control={<Radio />} label="All" />
                    </RadioGroup>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={onCreate}>Create</Button>
            </DialogActions>
        </Dialog>
        </>
    );
};
