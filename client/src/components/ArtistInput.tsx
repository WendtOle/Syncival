import { useAtom } from "jotai";
import { dataAtom } from "../state/data";
import {
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Toolbar,
} from "@mui/material";
import LineupIcon from "@mui/icons-material/FormatListBulleted";
import { useNavigate } from "react-router-dom";
import { LinueupCreationDialogWrapper } from "./LineupCreationDialogButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { selectedLineupKeyAtom } from "../state/main";

export const ArtistInput = () => {
  const [data] = useAtom(dataAtom);
  const navigate = useNavigate();
  const [selectedLineupKey, setSelectedLineupKey] = useAtom(
    selectedLineupKeyAtom,
  );

  const selectLineup = (event: any, key: string) => {
    event.stopPropagation();
    setSelectedLineupKey(key);
  };

  return (
    <div>
      <Toolbar sx={{ justifyContent: "end" }}>
        <LinueupCreationDialogWrapper>
          {(onClick: () => void) => (
            <Button onClick={onClick}>Add lineup</Button>
          )}
        </LinueupCreationDialogWrapper>
      </Toolbar>
      <Divider />
      <List>
        {data.map(({ key, name, artists }) => {
          const selected = selectedLineupKey === key;
          return (
            <ListItem
              key={key}
              onClick={() => navigate("/lineup/" + key)}
              sx={{ background: selected ? "#bffde6" : "" }}
            >
              <ListItemIcon>
                <LineupIcon />
              </ListItemIcon>
              <ListItemText
                primary={name}
                secondary={`${artists.length} artists`}
              />
              <ListItemSecondaryAction
                onClick={(event) => selectLineup(event, key)}
              >
                <IconButton>
                  {selectedLineupKey === key ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};
