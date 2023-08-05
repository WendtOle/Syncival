import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { LinueupCreationDialogWrapper } from "./LineupCreationDialogWrapper";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { useAtomValue, useAtom } from "jotai";
import { lineupsAtom } from "../state/lineups";
import { selectedLineupKeyAtom } from "../state/main";

export const LineupDrawerSection = ({ onSelect }: { onSelect: () => void }) => {
  const lineups = useAtomValue(lineupsAtom);
  const [selectedLineupKey, setSelectedLineupKey] = useAtom(
    selectedLineupKeyAtom,
  );

  const selectLineup = (key: string) => {
    setSelectedLineupKey(key);
    onSelect();
  };

  return (
    <List dense>
      <ListItem>
        <ListItemText primary="Lineups" />
        <ListItemSecondaryAction>
          <LinueupCreationDialogWrapper>
            {(onClick: () => void) => (
              <IconButton size="small" onClick={onClick}>
                <PlaylistAddIcon />
              </IconButton>
            )}
          </LinueupCreationDialogWrapper>
        </ListItemSecondaryAction>
      </ListItem>
      {lineups.map(({ key, name }) => {
        const selected = selectedLineupKey === key;
        return (
          <ListItemButton
            key={key}
            onClick={() => selectLineup(key)}
            selected={selected}
          >
            <ListItemIcon>
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItemButton>
        );
      })}
    </List>
  );
};
