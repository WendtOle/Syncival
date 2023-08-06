import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import { PlaylistDialogButton } from "./PlaylistDialogButton";
import {
  CheckboxState,
  useToggleFollowedPlaylists,
} from "../hooks/useToggleFollowedPlaylists";
import { useSetAtom } from "jotai";
import { informationToastAtom } from "../state/main";

export const PlaylistDrawerSection = ({
  onSelect,
}: {
  onSelect: () => void;
}) => {
  const { state, toggle } = useToggleFollowedPlaylists();
  const setInformationToast = useSetAtom(informationToastAtom);

  const onToggle = () => {
    toggle();
    onSelect();
    setInformationToast(
      state === CheckboxState.ON
        ? "Followed playlists deselected"
        : "Followed playlists selected",
    );
  };

  return (
    <List dense>
      <ListItem>
        <ListItemText primary="Spotify playlists" />
        <ListItemSecondaryAction>
          <PlaylistDialogButton onClose={onSelect} />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItemButton disabled>
        <ListItemIcon>
          <CheckBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Own" />
      </ListItemButton>
      <ListItemButton onClick={onToggle}>
        <ListItemIcon>
          {state === CheckboxState.OFF ? (
            <CheckBoxOutlineBlankIcon />
          ) : state === CheckboxState.ON ? (
            <CheckBoxIcon color="info" />
          ) : (
            <IndeterminateCheckBoxIcon color="info" />
          )}
        </ListItemIcon>
        <ListItemText primary="Followed" />
      </ListItemButton>
    </List>
  );
};
