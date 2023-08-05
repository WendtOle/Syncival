import { useAtom, useSetAtom } from "jotai";
import { lineupFetchedAtom } from "../state/fetch";
import { getLineups } from "../provider/lineups";
import { lineupsAtom } from "../state/lineups";
import { selectedLineupKeyAtom } from "../state/main";

export const useLineupFetch = async () => {
  const [lineupFetched, setLineupFetched] = useAtom(lineupFetchedAtom);
  const setLineups = useSetAtom(lineupsAtom);
  const setSelectedLineupKey = useSetAtom(selectedLineupKeyAtom);
  if (lineupFetched) {
    return;
  }
  const fetchedLineups = await getLineups();
  setLineups(fetchedLineups);
  setSelectedLineupKey(fetchedLineups[0].key);
  setLineupFetched(true);
};
