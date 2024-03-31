const express = require("express");
const url = require("url");
const querystring = require("querystring");

export const app = express();
import { artists as fusion2023 } from "./data/fusion-artists";
import { artists as tarmac2022 } from "./data/tarmac-2022";
import { artists as tomorrowland2023 } from "./data/tomorrowland-2023";
import { artists as tarmac2023 } from "./data/tarmac-2023";
import { isAllowedOrigin } from "./isAllowedOrigin";
import { timeStamp } from "./getCurrentTimeStamp";
import {
  getMySavedTracks,
  getPlaylistTracks,
  createPlaylist as providerCreatePlaylist,
  addTracksToPlaylist,
  replaceTracksInPlaylist,
  createAuthorizeURL,
  getTokens,
  getUserId,
  checkAccessTokenValid,
  getUserPlaylists,
  getRefreshedAccessToken,
} from "./provider";
import { Festival, getFestivalArtists } from "./provider/lineup";

const setCors = (req: any, res: any) => {
  const requestOrigin = req.headers.origin ?? [];
  if (isAllowedOrigin(requestOrigin)) {
    res.setHeader("Access-Control-Allow-Origin", requestOrigin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
};

app.get("/authorizeURL", (req: any, res: any) => {
  setCors(req, res);
  const requestOrigin = req.headers.origin ?? "localhost:3000";
  res.send(createAuthorizeURL(requestOrigin));
});

app.get("/authenticate", async (req: any, res: any) => {
  setCors(req, res);
  const { query } = url.parse(req.url);
  const { code } = querystring.parse(query);
  console.log(`code found: ${code}`);
  const { error, data } = await getTokens(code);
  if (data) {
    res.send(data);
    return;
  }
  res.send(error);
});

app.get("/accessTokenValid", async (req: any, res: any) => {
  setCors(req, res);
  const { query } = url.parse(req.url);
  const { accessToken } = querystring.parse(query);
  try {
    await checkAccessTokenValid(accessToken);
    res.send("ok");
    return;
  } catch (error: any) {
    if (error?.body?.error?.message === "The access token expired") {
      res.send("expired");
      return;
    }
    console.log({ error });
    res.send("error");
    return;
  }
});

app.get("/refresh", async (req: any, res: any) => {
  setCors(req, res);
  const { query } = url.parse(req.url);
  const { refreshToken } = querystring.parse(query);
  try {
    const newAccessToken = await getRefreshedAccessToken(refreshToken);
    res.send(newAccessToken);
    return;
  } catch (error: any) {
    console.log(error);
    console.log("some error occured");
  }
});

type Something = Array<{
  id: string;
  name: string;
  artists: Array<{ name: string; id: string }>;
  imageUrl?: string;
  albumName: string;
}>;

function toRecord<T, K extends string | number | symbol>(
  array: T[],
  keyExtractor: (item: T) => K
): Record<K, T> {
  return array.reduce((record, item) => {
    const key = keyExtractor(item);
    record[key] = item;
    return record;
  }, {} as Record<K, T>);
}

const extractImageUrl = (images: SpotifyApi.ImageObject[] | null) => {
  if (!images) return undefined;
  const smallestImage = images.reduce(
    (smallest: SpotifyApi.ImageObject, image: SpotifyApi.ImageObject) => {
      if (!image.height || !smallest.height) return smallest;
      if (image.height < smallest.height) return image;
      return smallest;
    },
    images[0]
  );
  return smallestImage.url;
};

app.get("/playlists", async (req: any, res: any) => {
  setCors(req, res);
  const { query } = url.parse(req.url);
  const { accessToken, page } = querystring.parse(query);
  try {
    const userId = await getUserId(accessToken);

    const playlists = await getUserPlaylists({ limit: 50, page, accessToken });
    const processedPlaylists = playlists.map(
      (playlist: SpotifyApi.PlaylistObjectSimplified) => ({
        name: playlist.name,
        id: playlist.id,
        isOwn: playlist.owner.id === userId,
        trackAmount: playlist.tracks.total,
        snapShotId: playlist.snapshot_id,
        imageUrl: extractImageUrl(playlist.images),
      })
    );
    res.send(toRecord(processedPlaylists, (playlist) => playlist.id));
    return;
  } catch (err: any) {
    console.log("Error when fetching playlists.");
    console.log(err);
    res.send("error");
    return;
  }
});

app.get("/tracks", async (req: any, res: any) => {
  setCors(req, res);
  const { query } = url.parse(req.url);
  const {
    accessToken,
    page: pageString,
    playlistId,
  } = querystring.parse(query);
  const page = Number(pageString);
  try {
    console.log("/tracks", { playlistId, page });
    const getResponse = () => {
      if (playlistId === "liked_songs") {
        return getMySavedTracks({ accessToken, limit: 50, page });
      }
      return getPlaylistTracks({ playlistId, accessToken, limit: 50, page });
    };
    const response = await getResponse();
    const trackData: Something = response
      .map(({ track }) => track)
      .filter((track) => track !== null)
      .map(({ id, name, artists, album }: any) => {
        const image = album.images.reduce((smallest: any, image: any) => {
          if (image.height < smallest.height) return image;
          return smallest;
        }, album.images[0]);
        return {
          id,
          name,
          artists: artists.map(
            ({ name, id }: SpotifyApi.ArtistObjectSimplified) => ({ name, id })
          ),
          imageUrl: image?.url,
          albumName: album.name,
        };
      });
    res.send(trackData);
    return;
  } catch (err: any) {
    console.log(`Error when fetching playlist tracks. "${playlistId}"`);
    console.log(err);
    res.send("error");
    return;
  }
});

const createPlaylist = async (
  accessToken: string,
  lineupName: string,
  key: string
) => {
  const name = `ArtistLookup - ${lineupName} [${key}]`;
  const response_createPlaylist = await providerCreatePlaylist(
    accessToken,
    name,
    `Playlist created by ArtistLookup at ${timeStamp()}`
  );
  const { id } = response_createPlaylist.body;
  return id;
};

app.post("/createPlaylist", async (req: any, res: any) => {
  setCors(req, res);
  const { query } = url.parse(req.url);
  const { accessToken, trackId, lineupName, playlistId, lineupKey } =
    querystring.parse(query);
  try {
    const id =
      playlistId ?? (await createPlaylist(accessToken, lineupName, lineupKey));
    const params = (Array.isArray(trackId) ? trackId : [trackId]).map(
      (id: string) => `spotify:track:${id}`
    );
    replaceTracksInPlaylist(id, [], accessToken);
    // I guess that not more than x tracks can be added to a playlist at once
    for (let i = 0; i < params.length; i += 50) {
      const paramsSlice = params.slice(i, i + 50);
      await addTracksToPlaylist(accessToken, id, paramsSlice);
    }
    res.send({ playlistId: id });
    return;
  } catch (err: any) {
    console.log("Error when creating playlist.");
    console.log(err);
    res.send({ status: "error" });
    return;
  }
});

app.get("/lineups", async (req: any, res: any) => {
  setCors(req, res);
  res.send([fusion2023, tarmac2022, tomorrowland2023, tarmac2023]);
  return;
});

app.get("/:festival", async (req: any, res: any) => {
  setCors(req, res);
  const { festival } = req.params;
  if (!Object.values(Festival).includes(festival)) {
    res.status(404).send("Invalid festival.");
    return;
  }
  const { query } = url.parse(req.url);
  const { accessToken, offset, limit } = querystring.parse(query);
  if (!accessToken) {
    res.status(401).send("No access token provided.");
    return;
  }
  res.send(
    await getFestivalArtists({
      accessToken,
      festival,
      offset: parseInt(offset ?? "0"),
      limit: parseInt(limit ?? "10"),
    })
  );
  return;
});
