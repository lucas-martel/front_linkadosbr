"use client";
import { Inter } from "next/font/google";
import { createTheme } from "@mui/material";
import { boxSizing, margin, padding, width } from "@mui/system";
/*
Primária: #2C3E50 (Azul profundo)
Secundária: #18BC9C (Verde água)
Neutra: #ECF0F1 (Cinza claro suave)
Detalhes: #E74C3C (Vermelho elegante)
*/
const bc = {
  deg: "145deg",
  c1: "#2C3E50",
  c2: "#18BC9C  ",
  c3: "#ECF0F1 ",
  pc1: "25%",
  pc2: "65%",
  pc3: "100%",
};
const inter = Inter({ subsets: ["latin"] });
const Theme1 = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2C3E50",
      light: "#5A6C80",
      dark: "#1A252F",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#18BC9C",
      light: "#4FD9B8",
      dark: "#128F74",
      contrastText: "#000000",
    },
    background: {
      default: "#D7DBDD",
      paper: "#ECF0F1",
    },
    text: {
      secondary: "#FFFFFF",
      primary: "#000000",
    },
  },
  typography: {
    fontFamily: "Poppins, serif",
    h4: {
      fontFamily: `"New Amsterdam", "Arial"`,
      userSelect: "none",
    },
    subtitle2: {
      userSelect: "none",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          padding: 0,
          margin: 0,
          boxSizing: "border-box",
        },
        body: {
          background: `linear-gradient(${bc.deg}, ${bc.c1} ${bc.pc1}, ${bc.c2} ${bc.pc2}, ${bc.c3} ${bc.pc3});`,
          width: "100vw",
          height: "100vh",
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          "&.Mui-selected": { color: "#94C4FF" },
        },
      },
    },
  },
});

export default Theme1;
