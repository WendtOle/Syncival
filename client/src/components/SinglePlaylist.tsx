import { Playlist as PlaylistType } from "../state/types";
import "./Playlist.css";
import { atom, useAtom } from "jotai";
import {
  excludedPlaylistIdsAtom,
  focusedAtom,
  playlistSongsAtom,
} from "../state/main";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

type PlaylistProps = PlaylistType & {
  toggle: (id: string) => void;
  hideSongs: boolean;
  fetching: boolean;
};

export const Playlist = ({
  id,
  name,
  tracks: numberOfSongs,
  toggle,
  hideSongs,
  fetching,
}: PlaylistProps) => {
  const navigate = useNavigate();
  const [excludedPlaylistId, setExcludedPlaylistId] = useAtom(
    excludedPlaylistIdsAtom,
  );
  const [songs] = useAtom(
    useMemo(() => atom((get) => get(playlistSongsAtom)[id] ?? []), [id]),
  );
  const [focused, setFocused] = useAtom(focusedAtom);

  const isExcluded = excludedPlaylistId.includes(id);

  const setExcludedPlaylistIdWrapper = (
    event: React.MouseEvent<HTMLInputElement>,
  ) => {
    event.stopPropagation();
    if (isExcluded) {
      setExcludedPlaylistId((cur) => cur.filter((curr) => curr !== id));
      return;
    }
    setExcludedPlaylistId((cur) => [...cur, id]);
  };

  const artists = songs.reduce(
    (acc, { artists }) => [...acc, ...artists.map(({ id }) => id)],
    [] as string[],
  );
  const containsFocusedArtist =
    focused?.type === "artist" && artists.includes(focused.id);
  const isFocused = focused?.type === "playlist" && focused.id === id;

  const onFocus = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (isFocused) {
      setFocused(null);
      return;
    }
    setFocused({ type: "playlist", id });
  };

  return (
    <div key={id} onClick={() => navigate("/playlist/" + id)}>
      {name} ({songs.length}/{numberOfSongs ?? "?"} songs){" "}
      {!hideSongs && <button onClick={onFocus}>focus</button>}
      {fetching && <div>...fetching</div>}
      <div className="playlist_song-container">
        {!hideSongs && (
          <div>
            {songs.map(({ name, id, artists }) => {
              const isFocused =
                focused?.type === "artist" &&
                artists.map(({ id }) => id).includes(focused.id);
              return (
                <div
                  className={
                    isFocused ? "focused playlist_song" : "playlist_song"
                  }
                  key={id}
                >
                  "{name}" - {artists.map(({ name }) => name).join(", ")}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
