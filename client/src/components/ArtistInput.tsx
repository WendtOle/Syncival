import { useAtom } from "jotai";
import { dataAtom } from "../state/data";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Toolbar,
} from "@mui/material";
import LineupIcon from "@mui/icons-material/FormatListBulleted";
import { useNavigate } from "react-router-dom";
import { LinueupCreationDialogButton } from "./LineupCreationDialogButton";
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
        <LinueupCreationDialogButton />
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
                {selectedLineupKey === key ? (
                  <VisibilityIcon />
                ) : (
                  <VisibilityOffIcon />
                )}
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};
