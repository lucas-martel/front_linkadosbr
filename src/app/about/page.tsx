"use client";
import { Box, Paper, Typography } from "@mui/material";
import { SxProps } from "@mui/material";
import Env from "@/Variables/Env";
import { useRef, useEffect, useState } from "react";
import Colors from "@/Variables/Colors";

const uiStyled: SxProps = {
  width: "20%",
  height: "70%",
  background: `linear-gradient(to top, ${Colors.orange}, ${Colors.productViewerBg})`,
  backgroundRepeat: "no-repeat",
  clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
};

const containerStyled: SxProps = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  overflow: "auto",
  alignItems: "center",
  flexWrap: "wrap",
};

const paperStyled: SxProps = {
  width: "50%",
  padding: "1em",
};

function About() {
  return (
    <Box sx={containerStyled}>
      <Box maxWidth={"50%"}>
        <Typography variant="h2" fontWeight={"bold"} color={Colors.orange}>
          Sobre a Links BR
        </Typography>
        <Typography variant="body1" color={"white"} lineHeight={1.5}>
          Somos um site pensado e criado para oferecer a você os melhores
          produtos de diversas loja espalhadas pelo mundo.
        </Typography>
        <Typography variant="body1" color={"white"} lineHeight={1.5}>
          Os Links que você vê aqui são filtrados para que você se sinta seguro
          ao pesquisar seus itens desejados.
        </Typography>
      </Box>
      <Box sx={uiStyled} />
      <Paper sx={paperStyled} elevation={10}>
        <Typography variant="h6">
          QUER FALAR CONOSCO? NOS MANDE UM EMAIL!
        </Typography>
        <Typography variant="body1" fontWeight={"bold"}>
          brlink@gmail.com
        </Typography>
      </Paper>
    </Box>
  );
}

export default About;
