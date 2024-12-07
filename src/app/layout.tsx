import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import MenuApp from "../components/MenuApp/MenuApp";

//ICONS
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InfoIcon from "@mui/icons-material/Info";

import TMenuNav from "@/types/TMenuNav";

import { DataProvider } from "../context/data";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Theme1 from "@/style/Theme1";

export const metadata: Metadata = {
  title: "Os melhores links de produtos - Linkados BR",
  description:
    "Aqui na LinkadosBR, você acha produtos muito bem avaliados nas melhores lojas virtuais com apenas um link",
  authors: [
    {
      name: "lucas leonã martel cavalcante",
      url: "https://github.com/lucas-martel",
    },
  ],
  keywords: ["produtos", "links de produtos", "amazon"],
  applicationName: "Linkados BR",
  creator: "Lucas Martel",
  other: {
    "google-site-verification": "JrjhEFlKMvmbx3VLmZnsdDZxl3xE9XH_Nqktannp42w",
  },
};

const optionsMenu: TMenuNav[] = [
  { icon: ShoppingBagIcon, label: "Produtos", path: "/" },
  { icon: FavoriteIcon, label: "Favoritos", path: "myLinks" },
  { icon: InfoIcon, label: "Sobre Nós", path: "about" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={Theme1}>
      <CssBaseline />
      <html lang="pt-br">
        <body>
          <Box
            display="grid"
            gridTemplateAreas={`"menu" "app"`}
            gridTemplateRows="10vh 90vh"
          >
            <Box gridArea={"menu"}>
              <MenuApp navOptions={optionsMenu} />
            </Box>
            <Box gridArea={"app"}>
              <DataProvider>{children}</DataProvider>
            </Box>
          </Box>
        </body>
      </html>
    </ThemeProvider>
  );
}
