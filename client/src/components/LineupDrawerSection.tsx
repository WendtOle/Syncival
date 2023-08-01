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
import { dataAtom } from "../state/data";
import { selectedLineupKeyAtom } from "../state/main";

export const LineupDrawerSection = ({ onSelect }: { onSelect: () => void }) => {
  const data = useAtomValue(dataAtom);
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
      {data.map(({ key, name }) => {
        const selected = selectedLineupKey === key;
        return (
          <ListItemButton
            key={key}
            onClick={() => selectLineup(key)}
            style={selected ? { background: "#bffde6" } : {}}
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
