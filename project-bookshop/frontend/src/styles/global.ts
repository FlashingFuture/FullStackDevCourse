import { globalCss } from "../stitches.config";

export const globalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },
  html: {
    fontSize: "16px",
  },
  body: {
    fontFamily: "system-ui, sans-serif",
    backgroundColor: "$background",
    color: "$text",
    lineHeight: 1.5,
    "-webkit-font-smoothing": "antialiased",
    transition: "background-color 0.2s ease, color 0.2s ease",
  },
  a: {
    color: "inherit",
    textDecoration: "none",
  },
  "ul, ol": {
    listStyle: "none",
  },
  "img, picture, video, canvas, svg": {
    display: "block",
    maxWidth: "100%",
  },
});
