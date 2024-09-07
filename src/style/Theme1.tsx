"use client";

import { createTheme } from "@mui/material";

const Theme1 = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#434343",
      paper: "#060F1A",
    },
    text: {
      primary: "#ffffff",
      secondary: "#C9C9C9",
    },
    primary: {
      main: "#162435",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#060F1A",
      contrastText: "#ffffff",
    },
  },
  typography: {
    h4: {
      fontFamily: `"New Amsterdam", "Arial"`,
      userSelect: "none",
    },
    subtitle2: {
      userSelect: "none",
    },
  },
  components: {
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: "#94C4FF",
          "&.Mui-selected": { color: "#ffffff" },
        },
      },
    },
  },
});

export default Theme1;
