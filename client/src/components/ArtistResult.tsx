import { useState } from "react";
import { useAtomValue } from "jotai";
import { filteredArtistsAtom } from "../state/main";
import { Button, List, Typography } from "@mui/material";
import { ArtistItem } from "./ArtistItem";
import { Toolbar } from "./Toolbar";
import { useCreatePlaylist } from "../hooks/useCreatePlaylist";

export const ArtistResult = () => {
  const filteredArtists = useAtomValue(filteredArtistsAtom);
  const [foldedOutArtists, setFoldedOutArtists] = useState<
    string | undefined
  >();
  const create = useCreatePlaylist();

  const sortedArtists = filteredArtists.sort((a, b) => {
    return b.tracks.length - a.tracks.length;
  });

  return (
    <div style={{}}>
      <Toolbar>
        <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
          {filteredArtists.length} artists
        </Typography>
        <Button variant="outlined" color="success" onClick={create}>
          Create playlist
        </Button>
      </Toolbar>

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
    </div>
  );
};
