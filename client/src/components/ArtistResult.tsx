import { useState } from "react";
import { createPlaylist } from "../provider/createPlaylist";
import { useAtom, useAtomValue } from "jotai";
import { filteredArtistsAtom } from "../state/main";
import { accessTokenAtom } from "../state/auth";
import { Button, List, Typography } from "@mui/material";
import { ArtistItem } from "./ArtistItem";
import { Toolbar } from "./Toolbar";

export const ArtistResult = () => {
  const [accessToken] = useAtom(accessTokenAtom);
  const filteredArtists = useAtomValue(filteredArtistsAtom);
  const [foldedOutArtists, setFoldedOutArtists] = useState<
    string | undefined
  >();

  const createPlaylistFromFilteredTracks = async () => {
    if (filteredArtists.length === 0) {
      return;
    }
    const playlistId = await createPlaylist(
      accessToken(),
      filteredArtists.map(({ tracks }) => tracks[0].id),
    );
    const link = `spotify:playlist:${playlistId}`;
    window.open(link, "_blank");
  };

  const sortedArtists = filteredArtists.sort((a, b) => {
    return b.tracks.length - a.tracks.length;
  });

  return (
    <div style={{}}>
      <Toolbar>
        <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
          {filteredArtists.length} artists
        </Typography>
        <Button
          variant="outlined"
          color="success"
          onClick={createPlaylistFromFilteredTracks}
        >
          Create playlist
        </Button>
      </Toolbar>

      <List dense sx={{ marginBottom: 6 }}>
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
