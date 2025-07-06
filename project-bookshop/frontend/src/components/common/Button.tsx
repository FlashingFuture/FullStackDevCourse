import { styled } from "@/stitches.config";

export const Button = styled("button", {
  padding: "8px 16px",
  borderRadius: "6px",
  fontWeight: 600,
  border: "none",
  cursor: "pointer",
  transition: "background 0.2s ease",

  variants: {
    color: {
      primary: {
        backgroundColor: "$primary",
        color: "white",

        "&:hover": {
          backgroundColor: "$primaryDark",
        },
      },
      secondary: {
        backgroundColor: "$secondary",
        color: "white",

        "&:hover": {
          backgroundColor: "$secondaryDark",
        },
      },
    },
  },

  defaultVariants: {
    color: "primary",
  },
});
