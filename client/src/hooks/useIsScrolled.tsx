import { useEffect, useState } from "react";

export const useIsScrolled = (container: HTMLElement) => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    if (!container) {
      console.log("no container found");
      return;
    }
    const handleScroll = () => {
      const scrollPosition = container.scrollTop;
      console.log("handleScroll", { scrollPosition });
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
  return isScrolled;
};
