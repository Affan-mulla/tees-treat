"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import Preloader from "./preloader";

interface PreloaderContextType {
  isPreloaderComplete: boolean;
}

const PreloaderContext = createContext<PreloaderContextType>({
  isPreloaderComplete: false,
});

// Module-level flag — survives hot reloads in dev, resets on full page load
let hasShownPreloader = false;

export function usePreloader() {
  return useContext(PreloaderContext);
}

export function PreloaderProvider({ children }: { children: ReactNode }) {
  // If preloader was already shown this session, start complete
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(
    hasShownPreloader
  );
  const [showPreloader, setShowPreloader] = useState(!hasShownPreloader);

  const handleComplete = useCallback(() => {
    hasShownPreloader = true;
    // Hide the preloader DOM node first (preloader.tsx does display:none),
    // then on the NEXT frame flip the flag so Hero's useEffect fires
    // after the preloader has fully exited.
    requestAnimationFrame(() => {
      setShowPreloader(false);
      setIsPreloaderComplete(true);
    });
  }, []);

  return (
    <PreloaderContext.Provider value={{ isPreloaderComplete }}>
      {showPreloader && <Preloader onComplete={handleComplete} />}
      {children}
    </PreloaderContext.Provider>
  );
}
