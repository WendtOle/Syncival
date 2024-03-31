import ListItemButton from "@mui/material/ListItemButton";
import { AppBar } from "../AppBar";
import { List } from "../List";
import ListItemText from "@mui/material/ListItemText";
import { useQuery } from "@tanstack/react-query";
import { backendUrl } from "../../state/loadEnvVariables";
import ListItem from "@mui/material/ListItem";
import { useNavigate } from "react-router";
import { Avatar, ListItemAvatar } from "@mui/material";

export const FestivalSelectionScreen = () => {
  const navigate = useNavigate();
  const { data: festivals } = useQuery({
    queryKey: ["festivals"],
    queryFn: async () => {
      const response = await fetch(`${backendUrl}/festivals`);
      return await response.json();
    },
  });
  return (
    <div>
      <AppBar title="Synceval" />
      <List>
        {festivals?.map(
          (festival: { name: string; artistAmount: number; key: string }) => (
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
                  secondary={`${festival.artistAmount} artists`}
                  sx={{ marginLeft: 2 }}
                />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </div>
  );
};
