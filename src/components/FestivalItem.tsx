import {
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Festival } from "../types/festival";

interface FestivalItemProps {
  festival: Festival;
}

export const FestivalItem = ({ festival }: FestivalItemProps) => {
  const navigate = useNavigate();

  return (
    <ListItem key={festival.key} disablePadding>
      <ListItemButton onClick={() => navigate(`/${festival.key}`)}>
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
            {festival.name[0]}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={festival.name}
          secondary={`${festival.artists.length} artists`}
          sx={{ marginLeft: 2 }}
        />
      </ListItemButton>
    </ListItem>
  );
};
