import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { scrolledAtom } from "../state/ui";

export const useIsScrolled = (id: string) => {
  const setIsScrolled = useSetAtom(scrolledAtom);

  useEffect(() => {
    const container = document.getElementById(id);
    if (!container) {
      return;
    }
    if (!container) {
      console.log("no container found");
      return;
    }
    const handleScroll = () => {
      const scrollPosition = container.scrollTop;
      if (scrollPosition > 10) {
        setIsScrolled(true);
        return;
      }
      setIsScrolled(false);
    };
    handleScroll();
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);
};
