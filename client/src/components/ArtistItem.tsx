import { ArtistV2 } from "../state/types";
import "./Playlist.css";
import { useAtomValue } from "jotai";
import { filteredArtistsAtom } from "../state/main";
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import SongIcon from "@mui/icons-material/Audiotrack";
import PersonIcon from "@mui/icons-material/Person";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import LaunchIcon from "@mui/icons-material/Launch";

export const ArtistItem = ({
  id,
  name,
  tracks,
  expandedArtist,
  setExpandedArtist,
  markWhenInLineUp,
}: ArtistV2 & {
  expandedArtist?: string;
  setExpandedArtist: (id?: string) => void;
  markWhenInLineUp?: boolean;
}) => {
  const filteredArtists = useAtomValue(filteredArtistsAtom);
  const expanded = expandedArtist === id;

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
      <ListItem onClick={() => setExpandedArtist(expanded ? undefined : id)}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary={name} secondary={`${tracks.length} songs`} />
        {expanded ? <ExpandLess /> : <ExpandMore />}
        <ListItemSecondaryAction>
          <LaunchIcon
            onClick={() => window.open(`spotify:artist:${id}`, "_blank")}
          />
        </ListItemSecondaryAction>
      </ListItem>
      {expanded && <Divider />}
      <Collapse in={expanded}>
        <List dense disablePadding>
          {tracks.map(({ name, id, artists }) => {
            return (
              <ListItem key={id} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <SongIcon />
                </ListItemIcon>
                <ListItemText
                  primary={name}
                  secondary={artists.map(({ name }) => name).join(", ")}
                />
                <ListItemSecondaryAction>
                  <LaunchIcon
                    onClick={() => window.open(`spotify:track:${id}`, "_blank")}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </Collapse>
      {expanded && <Divider />}
    </div>
  );
};
