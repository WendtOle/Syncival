import { AppBar } from "./AppBar";
import { List } from "./List";
import { useQuery } from "@tanstack/react-query";
import { lineupsQuery } from "../provider/queries";
import { FestivalItem } from "./FestivalItem";
import { Festival } from "../types/festival";
import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";

export const FestivalSelectionScreen = () => {
  const { data: festivals } = useQuery<Festival[]>(lineupsQuery);

  const clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      <AppBar title="Syncival" />
      <List>
        {festivals?.map((festival) => (
          <FestivalItem key={festival.key} festival={festival} />
        ))}
        <ListItemButton onClick={clearLocalStorage}>
          <ListItemAvatar>
            <Avatar
              style={{
                height: 54,
                width: 54,
                background: "#fff9c4",
                color: "gray",
              }}
              variant="square"
            >
              {" "}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={"Clear and reload data"}
            sx={{ marginLeft: 2 }}
          />
        </ListItemButton>
      </List>
    </div>
  );
};
