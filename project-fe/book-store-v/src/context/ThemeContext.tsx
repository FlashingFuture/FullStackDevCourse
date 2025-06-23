import { createContext, useContext, useState, useEffect } from "react";
import { darkTheme } from "../stitches.config";

const ThemeContext = createContext<{
  isDark: boolean;
  toggle: () => void;
}>({ isDark: false, toggle: () => {} });

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  const toggle = () => setIsDark((prev) => !prev);

  // 🔥 핵심: 다크 테마 클래스를 body에 직접 붙임
  useEffect(() => {
    document.body.className = isDark ? darkTheme : "";
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
