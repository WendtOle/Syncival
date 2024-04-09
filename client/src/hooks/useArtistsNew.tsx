import { useAtomValue } from "jotai";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArtistFilterOption, GroupableFilterOption } from "../types/filter";
import { accessTokenAtom } from "../state/auth";
import {
  albumQuery,
  followedQuery,
  likedQuery,
  lineupsQuery,
} from "../provider/queries";
import { Artist } from "../types/artist";

export const useArtists = ():
  | ((
      input:
        | Array<GroupableFilterOption>
        | ArtistFilterOption
        | GroupableFilterOption
    ) => Artist[])
  | undefined => {
  const accessToken = useAtomValue(accessTokenAtom);

  const festival = useParams().festival;
  const { data: festivals } = useQuery(lineupsQuery);
  const { data: followed } = useQuery<Array<SpotifyApi.ArtistObjectSimplified>>(
    followedQuery(accessToken)
  );
  const { data: albums } = useQuery<Array<SpotifyApi.ArtistObjectSimplified>>(
    albumQuery(accessToken)
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

  const all: Artist[] = selectedFestival?.artists ?? [];

  const someRecord: Record<
    GroupableFilterOption | ArtistFilterOption,
    (entry: Artist) => boolean
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
    [GroupableFilterOption.ALBUMS]: (entry) =>
      !!("id" in entry && albums?.find((album) => album.id == entry.id)),
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

  return multiple;
};
