import { useState } from "react";
import { createPlaylist } from "../provider/createPlaylist";
import { useAtom } from "jotai";
import { filteredArtistsAtom } from "../state/main";
import { accessTokenAtom } from "../state/auth";
import {
  AppBar,
  Button,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { ArtistItem } from "./ArtistItem";

export const ArtistResult = () => {
  const [accessToken] = useAtom(accessTokenAtom);
  const [filteredArtists] = useAtom(filteredArtistsAtom);
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
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Matched Artists
          </Typography>
        </Toolbar>
      </AppBar>

      <List dense sx={{ marginBottom: 12 }}>
        {sortedArtists.map((artist) => (
          <ArtistItem
            key={artist.id}
            {...artist}
            expandedArtist={foldedOutArtists}
            setExpandedArtist={setFoldedOutArtists}
          />
        ))}
        <ListItem
          sx={{
            position: "fixed",
            zIndex: 20000,
            bottom: 64,
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{ borderRadius: 16 }}
            color="success"
            onClick={createPlaylistFromFilteredTracks}
          >
            Create playlist
          </Button>
        </ListItem>
      </List>
    </div>
  );
};
