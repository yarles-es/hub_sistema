"use client";
import { useEffect } from "react";

import useLocalStorage from "./useLocalStorage";

type ColorMode = "light" | "dark";

const useColorMode = (): [ColorMode, (v: ColorMode) => void] => {
  const [colorMode, setColorMode] = useLocalStorage<ColorMode>(
    "color-theme",
    "dark"
  );

  useEffect(() => {
    const root = window.document.documentElement; // <html>
    const className = "dark";

    if (colorMode === "dark") {
      root.classList.add(className);
    } else {
      root.classList.remove(className);
    }
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;
