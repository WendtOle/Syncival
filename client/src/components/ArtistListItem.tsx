import { ListItem } from "@mui/material";
import { BaseArtistListItem } from "./BaseArtistListItem";
import { SpotifyArtistListItem } from "./SpotifyArtistListItem";

interface ArtistListItemProps {
  name: string;
  id?: string;
}

export const ArtistListItem = ({ name, id }: ArtistListItemProps) => {
  if (id !== undefined) return <SpotifyArtistListItem name={name} id={id} />;
  return (
    <ListItem>
      <BaseArtistListItem artist={name} />
    </ListItem>
  );
};
