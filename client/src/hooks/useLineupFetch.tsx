import { useAtom, useSetAtom } from "jotai";
import { lineupFetchedAtom } from "../state/fetch";
import { getLineups } from "../provider/lineups";
import { lineupsAtom } from "../state/lineups";
import { selectedLineupKeyAtom } from "../state/main";
import { useEffect } from "react";

export const useLineupFetch = async () => {
  const setLineups = useSetAtom(lineupsAtom);
  const setSelectedLineupKey = useSetAtom(selectedLineupKeyAtom);
  const [lineupFetched, setLineupFetched] = useAtom(lineupFetchedAtom);

  useEffect(() => {
    if (lineupFetched) {
      return;
    }
    const something = async () => {
      const fetchedLineups = await getLineups();
      setLineups((cur) => {
        const modified = cur.map((lineup) => {
          const fetchedLineup = fetchedLineups.find(
            ({ key }) => key === lineup.key,
          );
          if (!fetchedLineup) {
            return lineup;
          }
          return {
            ...lineup,
            ...fetchedLineup,
          };
        });
        return [
          ...modified,
          ...fetchedLineups.filter(
            ({ key }) => !cur.map(({ key }) => key).includes(key),
          ),
        ];
      });
      setSelectedLineupKey(fetchedLineups[0].key);
      setLineupFetched(true);
    };
    something();
  }, []);//eslint-disable-line react-hooks/exhaustive-deps
};
