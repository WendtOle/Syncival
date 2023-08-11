import { useState } from "react";
import { useAtomValue } from "jotai";
import { filteredArtistsAtom } from "../state/main";
import { List } from "@mui/material";
import { ArtistItem } from "./ArtistItem";

export const ArtistList = () => {
  const filteredArtists = useAtomValue(filteredArtistsAtom);
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
