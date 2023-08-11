import {
  List,
  AppBar,
  IconButton,
  CircularProgress,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";
import BackIcon from "@mui/icons-material/ArrowBackIos";
import { SongItem } from "./SongItem";
import { useAtomValue } from "jotai";
import {
  playlistAtom,
  matchedSongsByPlaylistAtom,
  tracksAtom,
} from "../state/main";

export const PlaylistScreen = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const playlists = useAtomValue(playlistAtom);
  const groupedSongs = useAtomValue(matchedSongsByPlaylistAtom);
  const tracks = useAtomValue(tracksAtom);

  if (!id || !playlists[id]) {
    return <CircularProgress />;
  }

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            onClick={() => navigate(-1)}
            sx={{ marginRight: 1 }}
          >
            <BackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {playlists[id].name}
          </Typography>
          {id !== "liked_songs" && (
            <IconButton
              color="inherit"
              onClick={() => window.open(`spotify:playlist:${id}`, "_blank")}
            >
              <LaunchIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <List dense>
        {groupedSongs[id]
          .map((id) => tracks[id])
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map((song, index) => {
            return <SongItem {...song} key={song.id + index} />;
          })}
      </List>
    </div>
  );
};
