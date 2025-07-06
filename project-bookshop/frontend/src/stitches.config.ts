import { createStitches } from "@stitches/react";

export const {
  styled,
  css,
  globalCss,
  theme,
  createTheme,
  config,
  getCssText,
} = createStitches({
  theme: {
    colors: {
      primary: "#3B82F6",
      primaryLight: "#93C5FD",
      primaryDark: "#1E40AF",

      secondary: "#F59E0B",
      secondaryLight: "#FCD34D",
      secondaryDark: "#B45309",

      gray100: "#F5F5F5",
      gray500: "#737373",
      background: "#ffffff",
      text: "#000000",
    },
  },
});

// 다크 테마 생성
export const darkTheme = createTheme({
  colors: {
    primary: "#60A5FA",
    secondary: "#FBBF24",
    background: "#121212",
    text: "#f1f1f1",
  },
});
