import { useParams } from "react-router-dom";
import { AppBar } from "../AppBar";
import { Virtuoso } from "react-virtuoso";
import { useInfiniteQuery } from "@tanstack/react-query";
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

export const FestivalScreen = () => {
  const accessToken = useAtomValue(accessTokenAtom);
  const festival = useParams().festival;

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

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <AppBar title={festival ?? "undefined"} />
      <Virtuoso
        style={{
          height: "100%",
        }}
        data={artists?.pages.flatMap((page) => page)}
        itemContent={(index) => {
          const artist = artists?.pages.flatMap((page) => page)[index];
          if (typeof artist === "string")
            return (
              <ListItem>
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
