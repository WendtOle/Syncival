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

  return (
    <div>
      <AppBar title="Syncival" />
      <List>
        {festivals?.map((festival) => (
          <FestivalItem key={festival.key} festival={festival} />
        ))}
      </List>
    </div>
  );
};
