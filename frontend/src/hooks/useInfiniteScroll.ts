import { useCallback, useEffect, useRef } from "react";

const useInfiniteScroll = (callback: () => void) => {
  const eRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const setObserver = useCallback(() => {
    if (eRef.current === null || !("IntersectionObserver" in window)) return;

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) callback();
    });

    if (eRef.current.lastChild) {
      observer.current.observe(eRef.current.lastChild as Element);
    }
  }, [callback]);

  const disconnectObserver = useCallback(() => {
    if (observer.current) {
      observer.current.disconnect();
    }
  }, []);

  useEffect(() => {
    setObserver();
    return () => {
      disconnectObserver();
    };
  }, [disconnectObserver, setObserver]);

  return { eRef };
};

export default useInfiniteScroll;
