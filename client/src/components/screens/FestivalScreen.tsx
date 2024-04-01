import { useParams } from "react-router-dom";
import { AppBar } from "../AppBar";
import { Virtuoso } from "react-virtuoso";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { backendUrl } from "../../state/loadEnvVariables";
import { SpotifyIFrameWrapper } from "../SpotifyIFrameWrapper";
import {
  Avatar,
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

export const FestivalScreen = () => {
  const accessToken = useAtomValue(accessTokenAtom);
  const festival = useParams().festival;
  useIsScrolled("artist-scroll-container");
  const artistFilter = useAtomValue(artistsFilterAtom);

  const fetchPage = async ({ pageParam: offset }: any) => {
    //if (!accessToken()) return;
    const url = `${backendUrl}/${festival}?accessToken=${accessToken()}&offset=${offset}`;
    const response = await fetch(url);
    return await response.json();
  };

  const { data: artists, fetchNextPage } = useInfiniteQuery({
    queryKey: [festival],
    queryFn: fetchPage,
    initialPageParam: 0,
    getNextPageParam: (_, __, lastPageParam) => {
      return lastPageParam + 10;
    },
  });

  const { data: festivals } = useQuery({
    queryKey: ["festivals"],
    queryFn: async () => {
      const response = await fetch(`${backendUrl}/festivals`);
      return await response.json();
    },
  });

  const festivalName = festivals.find(
    ({ key }: { key: string }) => key === festival
  ).name;

  const filteredArtists = artists?.pages
    .flatMap((page) => page)
    .filter(
      (artist) =>
        artistFilter === "all" ||
        (artistFilter === "spotify" && typeof artist === "object") ||
        (artistFilter === "nonSpotify" && typeof artist === "string")
    );

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <AppBar title={festivalName} showBackButton>
        <ArtistFilter />
      </AppBar>
      <Virtuoso
        style={{
          height: "100%",
        }}
        data={filteredArtists}
        id="artist-scroll-container"
        itemContent={(index) => {
          const artist = (filteredArtists ?? [])[index];
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
