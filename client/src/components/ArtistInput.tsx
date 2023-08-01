import { useAtom } from "jotai";
import { dataAtom } from "../state/data";
import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Toolbar,
} from "@mui/material";
import LineupIcon from "@mui/icons-material/FormatListBulleted";
import { useNavigate } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import { LinueupCreationDialogButton } from "./LineupCreationDialogButton";

export const ArtistInput = () => {
  const [data, setData] = useAtom(dataAtom);
  const navigate = useNavigate();

  const deleteLineUp = (event: any, key: string) => {
    event.stopPropagation();
    setData((cur) => {
      const newData = { ...cur };
      delete newData[key];
      return newData;
    });
  };

  return (
    <div>
      <Toolbar sx={{ justifyContent: "end" }}>
        <LinueupCreationDialogButton />
      </Toolbar>
      <Divider />
      <List>
        {Object.entries(data).map(([key, value]) => (
          <ListItemButton key={key} onClick={() => navigate("/lineup/" + key)}>
            <ListItemIcon>
              <LineupIcon />
            </ListItemIcon>
            <ListItemText primary={key} secondary={`${value.length} artists`} />
            <ListItemSecondaryAction
              onClick={(event) => deleteLineUp(event, key)}
            >
              <Delete />
            </ListItemSecondaryAction>
          </ListItemButton>
        ))}
      </List>
    </div>
  );
};
