import { useAtom } from "jotai";
import { onlyShowShopifyArtistsAtom } from "../state/ui";
import Chip from "@mui/material/Chip";

export const ArtistFilter = () => {
  const [onlyShowShopifyArtists, setOnlyShowShopifyArtists] = useAtom(
    onlyShowShopifyArtistsAtom
  );
  return (
    <div style={{ marginBottom: 8, marginLeft: 16 }}>
      <Chip
        label="Spotify"
        variant={onlyShowShopifyArtists ? "filled" : "outlined"}
        sx={{
          borderRadius: 2,
          backgroundColor: onlyShowShopifyArtists ? "gray" : "white",
          color: onlyShowShopifyArtists ? "white" : "black",
        }}
        onClick={() => setOnlyShowShopifyArtists((prev) => !prev)}
      />
    </div>
  );
};
