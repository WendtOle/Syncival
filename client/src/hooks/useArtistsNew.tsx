import { useAtomValue } from "jotai";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  followedQuery,
  likedQuery,
  lineupsQuery,
} from "../components/screens/FestivalSelectionScreen";
import {
  ArtistFilterOption,
  FilterGroupOption,
  GroupableFilterOption,
} from "../state/ui";
import { accessTokenAtom } from "../state/auth";

export const useArtists = ():
  | {
      single: Record<
        ArtistFilterOption | GroupableFilterOption,
        Array<
          | SpotifyApi.ArtistObjectFull
          | Pick<SpotifyApi.ArtistObjectFull, "name">
        >
      >;
      multiple: (
        input:
          | Array<GroupableFilterOption>
          | ArtistFilterOption
          | GroupableFilterOption
      ) => Array<
        SpotifyApi.ArtistObjectFull | Pick<SpotifyApi.ArtistObjectFull, "name">
      >;
    }
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

  const all: Array<
    SpotifyApi.ArtistObjectFull | Pick<SpotifyApi.ArtistObjectFull, "name">
  > = selectedFestival?.artists ?? [];

  const getArtists = (option: ArtistFilterOption | GroupableFilterOption) => {
    if (option === ArtistFilterOption.SPOTIFY)
      return all.filter((artist) => "id" in artist && artist.id);
    if (option === ArtistFilterOption.NON_SPOTIFY)
      return all.filter((artist) => !("id" in artist) || !artist.id);
    if (option === GroupableFilterOption.FOLLOWED)
      return all.filter(
        (artist) =>
          followed?.find(
            (followedArtist) =>
              "id" in artist && followedArtist.id === artist.id
          )
      );
    if (option === GroupableFilterOption.LIKED)
      return all.filter(
        (artist) =>
          liked?.find(
            (likedSongArtist) =>
              "id" in artist && likedSongArtist.id === artist.id
          )
      );
    return all;
  };

  const someRecord: Record<
    GroupableFilterOption | ArtistFilterOption,
    (
      entry:
        | SpotifyApi.ArtistObjectFull
        | Pick<SpotifyApi.ArtistObjectFull, "name">
    ) => boolean
  > = {
    [GroupableFilterOption.FOLLOWED]: (entry) =>
      !!(
        "id" in entry &&
        followed?.find((followedEntry) => followedEntry.id == entry.id)
      ),
    [GroupableFilterOption.LIKED]: (entry) =>
      !!(
        "id" in entry && liked?.find((likedEntry) => likedEntry.id == entry.id)
      ),
    [ArtistFilterOption.SPOTIFY]: (entry) =>
      "id" in entry && entry.id !== undefined,
    [ArtistFilterOption.NON_SPOTIFY]: (entry) => !("id" in entry),
    [ArtistFilterOption.ALL]: () => true,
  };

  const multiple = (
    input:
      | Array<GroupableFilterOption>
      | ArtistFilterOption
      | GroupableFilterOption
  ) =>
    all.filter((artist) => {
      const filterToCheck = typeof input === "string" ? [input] : input;
      return filterToCheck.find((entry) => someRecord[entry](artist));
    });

  return {
    single: {
      [ArtistFilterOption.SPOTIFY]: getArtists(ArtistFilterOption.SPOTIFY),
      [ArtistFilterOption.NON_SPOTIFY]: getArtists(
        ArtistFilterOption.NON_SPOTIFY
      ),
      [GroupableFilterOption.FOLLOWED]: getArtists(
        GroupableFilterOption.FOLLOWED
      ),
      [GroupableFilterOption.LIKED]: getArtists(GroupableFilterOption.LIKED),
      [ArtistFilterOption.ALL]: selectedFestival.artists as Array<
        SpotifyApi.ArtistObjectFull | Pick<SpotifyApi.ArtistObjectFull, "name">
      >,
    },
    multiple,
  };
};
