import ListItemButton from "@mui/material/ListItemButton";
import { AppBar } from "./AppBar";
import { List } from "./List";
import ListItemText from "@mui/material/ListItemText";
import { useQuery } from "@tanstack/react-query";
import ListItem from "@mui/material/ListItem";
import { useNavigate } from "react-router";
import { Avatar, ListItemAvatar } from "@mui/material";
import { accessTokenAtom } from "../state/auth";
import { useAtomValue } from "jotai";
import { lineupsQuery, followedQuery } from "../provider/queries";

export const FestivalSelectionScreen = () => {
  const navigate = useNavigate();
  const accessToken = useAtomValue(accessTokenAtom);
  const { data: festivals } = useQuery(lineupsQuery);

  useQuery(followedQuery(accessToken));

  return (
    <div>
      <AppBar title="Synceval" />
      <List>
        {festivals?.map(
          (festival: { name: string; artists: string[]; key: string }) => (
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
          )
        )}
      </List>
    </div>
  );
};
