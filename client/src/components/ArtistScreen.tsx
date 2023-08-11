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
import { useArtistInfo } from "../hooks/useArtistInfo";
import BackIcon from "@mui/icons-material/ArrowBackIos";
import { SongItem } from "./SongItem";

export const ArtistScreen = () => {
  const { id } = useParams<{ id: string }>();
  const artist = useArtistInfo(id);
  const navigate = useNavigate();

  if (!artist) {
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
            {artist.name}
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => window.open(`spotify:artist:${id}`, "_blank")}
          >
            <LaunchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <List dense>
        {artist.tracks
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map((song) => {
            return <SongItem {...song} key={song.id} />;
          })}
      </List>
    </div>
  );
};
