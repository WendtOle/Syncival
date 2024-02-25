import { PlaylistInformation } from "../state/types";

export const LIKED_SONGS_PLAYLIST_ID = "liked_songs";
export const likedSongsPlaylist: PlaylistInformation = {
  name: "Liked Songs",
  id: LIKED_SONGS_PLAYLIST_ID,
  isOwn: true,
  snapShotId: "liked_songs_snapshot",
  snapShotDate: new Date(),
};
