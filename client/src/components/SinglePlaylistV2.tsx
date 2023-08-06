import { Track } from "../state/types";
import "./Playlist.css";
import { atom, useAtom, useAtomValue } from "jotai";
import {
  filteredArtistsAtom,
  playlistSongsAtom,
  playlistInformationAtom,
} from "../state/main";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, CircularProgress, List } from "@mui/material";
import { extractArtists } from "../util/extractArtists";
import { SongItem } from "./SongItem";
import { ArtistItem } from "./ArtistItem";
import { Toolbar } from "./Toolbar";

export const Playlist = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error("No id provided");
  }
  const playList = useAtomValue(
    useMemo(
      () =>
        atom((get) =>
          get(playlistInformationAtom).find(({ id: cur }) => cur === id),
        ),
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
      <Toolbar>
        <Button
          variant="outlined"
          onClick={() =>
            setGroupBy((cur) => (cur === "songs" ? "artist" : "songs"))
          }
        >
          Group by {groupBy === "songs" ? "artist" : "song"}
        </Button>
      </Toolbar>
      <List dense>
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
    </div>
  );
};
