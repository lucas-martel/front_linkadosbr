"use client";

import Env from "@/Variables/Env";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

function CreateCategory() {
  const router = useRouter();

  const catRef = useRef<HTMLInputElement>(null);

  const createCategory = async () => {
    try {
      const data = await axios.post(
        Env.baseUrlSecure + "/cat",
        { title: catRef.current?.value },
        { withCredentials: true }
      );
      console.log("categoria criado com sucesso: " + data.data);
      if (data.status === 200) {
        alert("categoria criada com sucesso");
      }
    } catch (error: any) {
      if (error.response) {
        const resp = error.response as AxiosResponse;
        console.log(resp);
        switch (resp.status) {
          case 401:
            alert("faça login para criar uma categoria");
            break;
          case 500:
            alert(
              "algo ocorreu de errado na criacao da categoria: " +
                catRef.current?.value
            );
            break;
          default:
            alert("error no servidor");
            break;
        }
      }
    }
  };

  return (
    <Box>
      <Typography>Criação de Categoria</Typography>
      <TextField type="text" label="Categoria" inputRef={catRef} />
      <Button variant="contained" onClick={createCategory}>
        Criar Categoria
      </Button>
    </Box>
  );
}

export default CreateCategory;
