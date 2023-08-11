import { ArtistV3 } from "../state/types";
import "./Playlist.css";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { useFilteredArtists } from "../hooks/useFilteredArtists";

export const ArtistItem = ({
  id,
  name,
  tracks,
  markWhenInLineUp,
}: ArtistV3 & {
  expandedArtist?: string;
  setExpandedArtist: (id?: string) => void;
  markWhenInLineUp?: boolean;
}) => {
  const navigate = useNavigate();
  const filteredArtists = useFilteredArtists();

  const containedInLineup = filteredArtists.find(
    ({ id: curId }) => curId === id,
  );

  return (
    <div
      key={id}
      style={{
        background: containedInLineup && markWhenInLineUp ? "#bffde6" : "",
      }}
    >
      <ListItemButton onClick={() => navigate(`/artist/${id}`)}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary={name} secondary={`${tracks.length} songs`} />
      </ListItemButton>
    </div>
  );
};
