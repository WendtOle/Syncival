import { useParams } from "react-router-dom";
import { AppBar } from "../AppBar";
import { Virtuoso } from "react-virtuoso";
import { useQuery } from "@tanstack/react-query";
import { useIsScrolled } from "../../hooks/useIsScrolled";
import { followedQuery, lineupsQuery } from "./FestivalSelectionScreen";
import { ArtistItem } from "../ArtistItem";
import { useAtomValue } from "jotai";
import { artistsFilterAtom } from "../../state/ui";
import { ArtistFilter } from "../ArtistFilter";
import { accessTokenAtom } from "../../state/auth";

export const FestivalScreen = () => {
  const accessToken = useAtomValue(accessTokenAtom);

  const festival = useParams().festival;
  const artistFilter = useAtomValue(artistsFilterAtom);
  useIsScrolled("artist-scroll-container");

  const { data: festivals } = useQuery(lineupsQuery);
  const { data: followed } = useQuery(followedQuery(accessToken));

  const selectedFestival = (festivals ?? []).find(
    ({ key }: { key: string }) => key === festival
  );

  if (!selectedFestival) {
    return <div>Not found</div>;
  }

  const getArtists = () => {
    const all = selectedFestival?.artists ?? [];
    if (artistFilter === "spotify")
      return all.filter((artist: any) => artist.id);
    if (artistFilter === "nonSpotify")
      return all.filter((artist: any) => !artist.id);
    if (artistFilter === "followed")
      return all.filter(
        (artist: any) =>
          followed?.find(
            (followedArtist: any) => followedArtist.id === artist.id
          )
      );
    return all;
  };
  const artists = getArtists().sort(
    ({ name: a }: { name: string }, { name: b }: { name: string }) =>
      a.toLowerCase() < b.toLowerCase() ? -1 : 1
  );

  const artistElement = artists.map((artist: any) => {
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
      />
    </div>
  );
};
