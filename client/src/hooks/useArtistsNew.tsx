import { useAtomValue } from "jotai";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  followedQuery,
  likedQuery,
  lineupsQuery,
} from "../components/screens/FestivalSelectionScreen";
import { ArtistFilterOption } from "../state/ui";
import { accessTokenAtom } from "../state/auth";

export const useArtists = ():
  | Record<
      ArtistFilterOption,
      Array<
        SpotifyApi.ArtistObjectFull | Pick<SpotifyApi.ArtistObjectFull, "name">
      >
    >
  | undefined => {
  const accessToken = useAtomValue(accessTokenAtom);

  const festival = useParams().festival;
  const { data: festivals } = useQuery(lineupsQuery);
  const { data: followed } = useQuery<Array<SpotifyApi.ArtistObjectSimplified>>(
    followedQuery(accessToken)
  );
  const { data: liked } = useQuery<Array<SpotifyApi.ArtistObjectSimplified>>(
    likedQuery(accessToken)
  );

  const selectedFestival = (festivals ?? []).find(
    ({ key }: { key: string }) => key === festival
  );

  if (!selectedFestival) {
    return undefined;
  }

  const getArtists = (option: ArtistFilterOption) => {
    const all: Array<
      SpotifyApi.ArtistObjectFull | Pick<SpotifyApi.ArtistObjectFull, "name">
    > = selectedFestival?.artists ?? [];
    if (option === ArtistFilterOption.SPOTIFY)
      return all.filter((artist) => "id" in artist && artist.id);
    if (option === ArtistFilterOption.NON_SPOTIFY)
      return all.filter((artist) => !("id" in artist) || !artist.id);
    if (option === ArtistFilterOption.FOLLOWED)
      return all.filter(
        (artist) =>
          followed?.find(
            (followedArtist) =>
              "id" in artist && followedArtist.id === artist.id
          )
      );
    if (option === ArtistFilterOption.LIKED)
      return all.filter(
        (artist) =>
          liked?.find(
            (likedSongArtist) =>
              "id" in artist && likedSongArtist.id === artist.id
          )
      );
    if (option === ArtistFilterOption.LIKED_AND_FOLLOWED)
      return all.filter((artist) =>
        [...(liked ?? []), ...(followed ?? [])].find(
          (toCheck) => "id" in artist && toCheck.id === artist.id
        )
      );
    return all;
  };

  return {
    [ArtistFilterOption.SPOTIFY]: getArtists(ArtistFilterOption.SPOTIFY),
    [ArtistFilterOption.NON_SPOTIFY]: getArtists(
      ArtistFilterOption.NON_SPOTIFY
    ),
    [ArtistFilterOption.FOLLOWED]: getArtists(ArtistFilterOption.FOLLOWED),
    [ArtistFilterOption.LIKED]: getArtists(ArtistFilterOption.LIKED),
    [ArtistFilterOption.LIKED_AND_FOLLOWED]: getArtists(
      ArtistFilterOption.LIKED_AND_FOLLOWED
    ),
    [ArtistFilterOption.ALL]: selectedFestival.artists as Array<
      SpotifyApi.ArtistObjectFull | Pick<SpotifyApi.ArtistObjectFull, "name">
    >,
  };
};
