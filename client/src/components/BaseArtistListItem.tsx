import { Avatar, ListItemAvatar, ListItemText } from "@mui/material";

interface BaseArtistListItemProps {
  artist: string;
}

export const BaseArtistListItem = ({ artist }: BaseArtistListItemProps) => {
  return (
    <>
      <ListItemAvatar>
        <Avatar
          sx={{
            bgcolor: "lightgrey",
          }}
          children={artist
            .split(" ")
            .map((word) => word[0])
            .join("")}
        />
      </ListItemAvatar>
      <ListItemText primary={artist} />
    </>
  );
};
