import { useAtom, useSetAtom } from "jotai";
import { lineupFetchedAtom } from "../state/fetch";
import { getLineups } from "../provider/data";
import { lineupsAtom } from "../state/data";
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
