import { useParams } from "react-router-dom";
import { AppBar } from "../AppBar";
import { Virtuoso } from "react-virtuoso";
import { useQuery } from "@tanstack/react-query";
import { useIsScrolled } from "../../hooks/useIsScrolled";
import {
  followedQuery,
  likedQuery,
  lineupsQuery,
} from "./FestivalSelectionScreen";
import { ArtistItem } from "../ArtistItem";
import { useAtomValue } from "jotai";
import { ArtistFilterOption, artistsFilterAtom } from "../../state/ui";
import { ArtistFilter } from "../ArtistFilter";
import { accessTokenAtom } from "../../state/auth";

export const FestivalScreen = () => {
  const accessToken = useAtomValue(accessTokenAtom);

  const festival = useParams().festival;
  const artistFilter = useAtomValue(artistsFilterAtom);
  useIsScrolled("artist-scroll-container");

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
    return <div>Not found</div>;
  }

  const getArtists = () => {
    const all: Array<
      SpotifyApi.ArtistObjectFull | Pick<SpotifyApi.ArtistObjectFull, "name">
    > = selectedFestival?.artists ?? [];
    if (artistFilter === ArtistFilterOption.SPOTIFY)
      return all.filter((artist) => "id" in artist && artist.id);
    if (artistFilter === ArtistFilterOption.NON_SPOTIFY)
      return all.filter((artist) => !("id" in artist) || !artist.id);
    if (artistFilter === ArtistFilterOption.FOLLOWED)
      return all.filter(
        (artist) =>
          followed?.find(
            (followedArtist) =>
              "id" in artist && followedArtist.id === artist.id
          )
      );
    if (artistFilter === ArtistFilterOption.LIKED)
      return all.filter(
        (artist) =>
          liked?.find(
            (likedSongArtist) =>
              "id" in artist && likedSongArtist.id === artist.id
          )
      );
    if (artistFilter === ArtistFilterOption.LIKED_AND_FOLLOWED)
      return all.filter((artist) =>
        [...(liked ?? []), ...(followed ?? [])].find(
          (toCheck) => "id" in artist && toCheck.id === artist.id
        )
      );
    return all;
  };
  const artists = getArtists().sort(
    ({ name: a }: { name: string }, { name: b }: { name: string }) =>
      a.toLowerCase() < b.toLowerCase() ? -1 : 1
  );

  const artistElement = artists.map((artist) => {
    return <ArtistItem artist={artist} />;
  });

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <AppBar title={selectedFestival.name} showBackButton>
        <ArtistFilter />
      </AppBar>
      <Virtuoso
        style={{
          height: "100%",
        }}
        data={artistElement}
        id="artist-scroll-container"
        itemContent={(index) => (artistElement ?? [])[index]}
        components={{ Footer: () => <div style={{ height: "85px" }} /> }}
      />
    </div>
  );
};
