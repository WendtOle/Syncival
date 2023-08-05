import { useAtom, useSetAtom } from "jotai";
import { lineupFetchedAtom } from "../state/fetch";
import { getData } from "../provider/data";
import { dataAtom } from "../state/data";
import { selectedLineupKeyAtom } from "../state/main";

export const useLineupFetch = async () => {
  const [lineupFetched, setLineupFetched] = useAtom(lineupFetchedAtom);
  const setData = useSetAtom(dataAtom);
  const setSelectedLineupKey = useSetAtom(selectedLineupKeyAtom);
  if (lineupFetched) {
    return;
  }
  const fetchedData = await getData();
  setData(fetchedData);
  setSelectedLineupKey(fetchedData[0].key);
  setLineupFetched(true);
};
