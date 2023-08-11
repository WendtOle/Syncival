import { useState } from "react";
import { List } from "@mui/material";
import { ArtistItem } from "./ArtistItem";
import { useFilteredArtists } from "../hooks/useFilteredArtists";

export const ArtistList = () => {
  const filteredArtists = useFilteredArtists();
  const [foldedOutArtists, setFoldedOutArtists] = useState<
    string | undefined
  >();

  const sortedArtists = filteredArtists.sort(
    (a, b) => b.tracks.length - a.tracks.length,
  );

  return (
    <List dense>
      {sortedArtists.map((artist) => (
        <ArtistItem
          key={artist.id}
          {...artist}
          expandedArtist={foldedOutArtists}
          setExpandedArtist={setFoldedOutArtists}
        />
      ))}
    </List>
  );
};
