import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MenuApp from "../components/MenuApp";

import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LinkIcon from "@mui/icons-material/Link";
import InfoIcon from "@mui/icons-material/Info";
import TypeMenuNav from "@/types/TypeMenuNav";

import { DataProvider } from "../context/data";
import { Box, ThemeProvider } from "@mui/material";
import Theme1 from "@/style/Theme1";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brink",
  description: "Melhores Links para o Brasil",
};

const optionsMenu: TypeMenuNav[] = [
  { icon: ShoppingBagIcon, label: "Produtos", path: "/" },
  { icon: LinkIcon, label: "Meus Links", path: "myLinks" },
  { icon: InfoIcon, label: "Sobre Nós", path: "about" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={Theme1}>
      <html lang="pt-br">
        <body>
          <Box
            display="grid"
            gridTemplateAreas={`"menu" "app"`}
            gridTemplateRows="6vh 94vh"
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
