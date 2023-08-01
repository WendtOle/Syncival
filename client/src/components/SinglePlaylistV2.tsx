import { Track } from "../state/types";
import "./Playlist.css";
import { atom, useAtom, useAtomValue } from "jotai";
import {
  filteredArtistsAtom,
  playlistSongsAtom,
  playlistsAtom,
} from "../state/main";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AppBar,
  CircularProgress,
  Fab,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import SongIcon from "@mui/icons-material/Audiotrack";
import PersonIcon from "@mui/icons-material/Person";
import { extractArtists } from "../util/extractArtists";
import { SongItem } from "./SongItem";
import { ArtistItem } from "./ArtistItem";

export const Playlist = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  if (!id) {
    throw new Error("No id provided");
  }
  const playList = useAtomValue(
    useMemo(
      () => atom((get) => get(playlistsAtom).find(({ id: cur }) => cur === id)),
      [id],
    ),
  );
  const [songs] = useAtom(
    useMemo(() => atom((get) => get(playlistSongsAtom)[id] ?? []), [id]),
  );
  const [groupBy, setGroupBy] = useState<"artist" | "songs">("songs");
  const [expandedArtist, setExpandedArtist] = useState<string | undefined>(
    undefined,
  );
  const filteredArtists = useAtomValue(filteredArtistsAtom);

  if (!playList) {
    return <CircularProgress />;
  }

  const { name } = playList;

  const uniqueSongs = songs
    .reduce(
      (acc, nextSong) =>
        acc.find(({ id: curId }) => curId === nextSong.id)
          ? acc
          : [...acc, nextSong],
      [] as Track[],
    )
    .map((song) => {
      const containsLineUpArtist = song.artists.some(({ id: artistId }) =>
        filteredArtists.map(({ id }) => id).includes(artistId),
      );
      return { ...song, containsLineUpArtist };
    })
    .sort((a, b) =>
      a.containsLineUpArtist === b.containsLineUpArtist
        ? a.name > b.name
          ? 1
          : -1
        : a.containsLineUpArtist
        ? -1
        : 1,
    );

  const uniqueArtists = extractArtists(uniqueSongs)
    .map((artist) => {
      return {
        ...artist,
        isLineUpArtist: filteredArtists.map(({ id }) => id).includes(artist.id),
      };
    })
    .sort((a, b) =>
      a.isLineUpArtist === b.isLineUpArtist
        ? a.name > b.name
          ? 1
          : -1
        : a.isLineUpArtist
        ? -1
        : 1,
    );

  return (
    <div key={id}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Playlist: "{name}"
          </Typography>
        </Toolbar>
      </AppBar>
      <List dense component="nav" sx={{ marginBottom: 16 }}>
        {groupBy === "songs"
          ? uniqueSongs.map((song) => <SongItem key={song.id} {...song} />)
          : uniqueArtists.map((artist) => {
              return (
                <ArtistItem
                  key={artist.id}
                  {...artist}
                  expandedArtist={expandedArtist}
                  setExpandedArtist={setExpandedArtist}
                  markWhenInLineUp
                />
              );
            })}
      </List>
      <Fab
        sx={{ position: "fixed", bottom: 72, right: 16 }}
        color="info"
        onClick={() =>
          setGroupBy((cur) => (cur === "songs" ? "artist" : "songs"))
        }
      >
        {groupBy === "songs" ? <PersonIcon /> : <SongIcon />}
      </Fab>
    </div>
  );
};
