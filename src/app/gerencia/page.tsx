"use client"

import { Box, Button, Typography } from "@mui/material";
import React from "react";

function Gerencia() {
  return (
    <Box>
      <Typography variant="h6">faça login:</Typography>
      <Button variant="contained" href="/gerencia/validate/?isRoot=true">
        root
      </Button>
      <Button variant="contained" href="/gerencia/admin/login">
        admin
      </Button>
    </Box>
  );
}

export default Gerencia;
