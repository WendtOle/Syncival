import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { RouteEnum } from "../state/types";
import DownloadIcon from "@mui/icons-material/Download";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { useNavigate } from "react-router-dom";

export const DataDrawerSection = ({ onSelect }: { onSelect: () => any }) => {
  const navigate = useNavigate();
  const goTo = (route: RouteEnum) => () => {
    onSelect();
    navigate(route);
  };

  return (
    <List dense>
      <ListItem>
        <ListItemText primary="Pages" />
      </ListItem>
      <ListItem onClick={goTo(RouteEnum.ARTISTS)}>
        <ListItemIcon>
          <PersonSearchIcon />
        </ListItemIcon>
        <ListItemText primary="Comparison" />
      </ListItem>
      <ListItem onClick={goTo(RouteEnum.LOADING)}>
        <ListItemIcon>
          <DownloadIcon />
        </ListItemIcon>
        <ListItemText primary="Data" />
      </ListItem>
    </List>
  );
};
