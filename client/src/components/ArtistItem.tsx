import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { CoverArt } from "./CoverArt";
import { SpotifyIFrameWrapper } from "./SpotifyIFrameWrapper";

interface ArtistItemProps {
  artist: any;
}

export const ArtistItem = ({ artist }: ArtistItemProps) => {
  if (artist?.id === undefined) {
    return (
      <ListItem dense>
        <ListItemAvatar>
          <Avatar
            variant="square"
            style={{
              width: 54,
              height: 54,
              background: "#EEE",
              color: "gray",
            }}
          >
            ?
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={artist?.name} sx={{ marginLeft: 2 }} />
      </ListItem>
    );
  }

  return (
    <SpotifyIFrameWrapper id={artist.id} type="artist">
      {(onClick) => {
        const smallestImage = artist.images?.reduce(
          (smallest: SpotifyApi.ImageObject, image: SpotifyApi.ImageObject) => {
            if (!image.height || !smallest.height) return smallest;
            if (image.height < smallest.height) return image;
            return smallest;
          },
          artist.images[0]
        );

        return (
          <ListItem onClick={onClick} disablePadding dense>
            <ListItemButton>
              <ListItemAvatar>
                <CoverArt imageUrl={smallestImage?.url} />
              </ListItemAvatar>
              <ListItemText
                primary={artist.name}
                secondary={artist.genres?.join(", ")}
                sx={{ marginLeft: 2 }}
              />
            </ListItemButton>
          </ListItem>
        );
      }}
    </SpotifyIFrameWrapper>
  );
};
