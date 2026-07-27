"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";
interface ThemeContextValue { theme: Theme; toggleTheme: () => void; }
const ThemeContext = createContext<ThemeContextValue>({ theme: "dark", toggleTheme: () => {} });
export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const stored = window.localStorage.getItem("theme") as Theme | null;
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const initial = stored ?? (prefersLight ? "light" : "dark");
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
    setMounted(true);
  }, []);
  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      window.localStorage.setItem("theme", next);
      return next;
    });
  };
  return <ThemeContext.Provider value={{ theme, toggleTheme }}><div style={{ visibility: mounted ? "visible" : "hidden" }}>{children}</div></ThemeContext.Provider>;
}
