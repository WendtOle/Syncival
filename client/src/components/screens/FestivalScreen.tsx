import { useParams } from "react-router-dom";
import { AppBar } from "../AppBar";
import { Virtuoso } from "react-virtuoso";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { backendUrl } from "../../state/loadEnvVariables";
import { SpotifyIFrameWrapper } from "../SpotifyIFrameWrapper";
import {
  Avatar,
  Icon,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useAtomValue } from "jotai";
import { accessTokenAtom } from "../../state/auth";
import { CoverArt } from "../CoverArt";
import { useIsScrolled } from "../../hooks/useIsScrolled";
import { artistsFilterAtom } from "../../state/ui";
import { ArtistFilter } from "../ArtistFilter";
import { InfoIcon } from "../Icons";

const LIMIT = 20;

export const FestivalScreen = () => {
  const accessToken = useAtomValue(accessTokenAtom);
  const festival = useParams().festival;
  useIsScrolled("artist-scroll-container");
  const artistFilter = useAtomValue(artistsFilterAtom);

  const fetchPage = async ({ pageParam: offset }: any) => {
    //if (!accessToken()) return;
    const url = `${backendUrl}/${festival}?accessToken=${accessToken()}&offset=${offset}&limit=${LIMIT}`;
    const response = await fetch(url);
    return await response.json();
  };

  const { data: festivals } = useQuery({
    queryKey: ["festivals"],
    queryFn: async () => {
      const response = await fetch(`${backendUrl}/festivals`);
      return await response.json();
    },
  });

  const selectedFestival = festivals.find(
    ({ key }: { key: string }) => key === festival
  );

  const { data: pagedArtists, fetchNextPage } = useInfiniteQuery({
    queryKey: [festival, "2"],
    queryFn: fetchPage,
    initialPageParam: 0,
    getNextPageParam: (_, pages) => {
      const alreadyQueried = pages.flatMap((entry) => entry).length;
      if (alreadyQueried === selectedFestival.artistAmount) return undefined;
      return alreadyQueried;
    },
  });

  type SpotifyArtist = SpotifyApi.ArtistObjectFull & { followed: boolean };

  const artists: Array<SpotifyArtist | string> =
    pagedArtists?.pages.flatMap((page) => page) ?? [];

  const filteredArtists = artists.filter(
    (artist) =>
      artistFilter === "all" ||
      (artistFilter === "spotify" && typeof artist === "object") ||
      (artistFilter === "nonSpotify" && typeof artist === "string") ||
      (artistFilter === "followed" &&
        typeof artist === "object" &&
        artist.followed)
  );

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <AppBar
        title={selectedFestival.name}
        showBackButton
        actions={
          <IconButton
            onClick={() =>
              alert(
                `${artists.length}/${selectedFestival.artistAmount} loaded \n "followed"-filter is shown when all artists were loaded`
              )
            }
          >
            <InfoIcon></InfoIcon>
          </IconButton>
        }
      >
        <ArtistFilter
          allArtistsLoaded={selectedFestival.artistAmount === artists.length}
        />
      </AppBar>
      <Virtuoso
        style={{
          height: "100%",
        }}
        data={[...filteredArtists, "dummy"]}
        id="artist-scroll-container"
        itemContent={(index) => {
          const artist = (filteredArtists ?? [])[index];
          if (filteredArtists.length === index)
            return <div style={{ height: "64px" }} />;
          if (typeof artist === "string")
            return (
              <ListItem dense>
                <ListItemAvatar>
                  <Avatar
                    variant="square"
                    style={{
                      width: 54,
                      height: 54,
                      background: "#EEE",
                      color: "gray",
                    }}
                  >
                    ?
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={artist} sx={{ marginLeft: 2 }} />
              </ListItem>
            );
          return (
            <SpotifyIFrameWrapper id={artist.id} type="artist">
              {(onClick) => {
                const smallestImage = artist.images?.reduce(
                  (
                    smallest: SpotifyApi.ImageObject,
                    image: SpotifyApi.ImageObject
                  ) => {
                    if (!image.height || !smallest.height) return smallest;
                    if (image.height < smallest.height) return image;
                    return smallest;
                  },
                  artist.images[0]
                );

                return (
                  <ListItem onClick={onClick} disablePadding dense>
                    <ListItemButton>
                      <ListItemAvatar>
                        <CoverArt imageUrl={smallestImage?.url} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={artist.name}
                        secondary={artist.genres?.join(", ")}
                        sx={{ marginLeft: 2 }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              }}
            </SpotifyIFrameWrapper>
          );
        }}
        endReached={() => fetchNextPage()}
      />
    </div>
  );
};
