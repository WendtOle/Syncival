import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { BaseArtistListItem } from "./BaseArtistListItem";
import { SpotifyIFrameWrapper } from "./SpotifyIFrameWrapper";
import { useAtomValue } from "jotai";
import { artistSnapshotsAtom } from "../state/main";

export interface SportifyArtistListItemProps {
  name: string;
  id: string;
}

export const SpotifyArtistListItem = ({ id }: SportifyArtistListItemProps) => {
  const artists = useAtomValue(artistSnapshotsAtom);
  const { name, genres, imageUrl } = artists[id];
  const genre = `${genres.slice(0, 2).join(", ")}${
    genres.length > 2 ? " ..." : ""
  }`;
  return (
    <SpotifyIFrameWrapper id={id} type="artist">
      {(onClick) => (
        <ListItem disablePadding>
          <ListItemButton onClick={onClick}>
            <ListItemAvatar>
              <Avatar src={imageUrl} variant="square" />
            </ListItemAvatar>
            <ListItemText primary={name} secondary={genre} />
          </ListItemButton>
        </ListItem>
      )}
    </SpotifyIFrameWrapper>
  );
};
