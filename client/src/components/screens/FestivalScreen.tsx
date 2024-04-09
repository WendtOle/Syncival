import { AppBar } from "../AppBar";
import { Virtuoso } from "react-virtuoso";
import { ArtistItem } from "../ArtistItem";
import { useAtomValue } from "jotai";
import { artistsFilterAtom } from "../../state/ui";
import { ArtistFilter } from "../ArtistFilter";
import { useArtists } from "../../hooks/useArtistsNew";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { lineupsQuery } from "./FestivalSelectionScreen";
import { useIsScrolled } from "../../hooks/useIsScrolled";

export const FestivalScreen = () => {
  const artistFilter = useAtomValue(artistsFilterAtom);
  useIsScrolled("artist-scroll-container");

  const festival = useParams().festival;
  const { data: festivals } = useQuery(lineupsQuery);

  const selectedFestival = (festivals ?? []).find(
    ({ key }: { key: string }) => key === festival,
  );

  const result = useArtists();

  const something = result?.(
    typeof artistFilter !== "object" ? artistFilter : artistFilter.items,
  );
  const sortedArtists = (something ?? []).sort(
    ({ name: a }: { name: string }, { name: b }: { name: string }) =>
      a.toLowerCase() < b.toLowerCase() ? -1 : 1,
  );

  const artistElement = sortedArtists.map((artist) => {
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
