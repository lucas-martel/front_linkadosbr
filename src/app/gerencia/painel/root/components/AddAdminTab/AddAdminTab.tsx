"use client";

import TAdminCreate from "@/types/TAdminCreate";
import TAdminLogin from "@/types/TAdminLogin";
import Env from "@/Variables/Env";
import { Password } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { FormEvent, FormEventHandler, useRef } from "react";

enum EnumInput {
  name,
  email,
  password,
}

function AddAdminTab() {
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const createAdmin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body: TAdminCreate = {
      email: email.current?.value!,
      name: name.current?.value!,
      password: password.current?.value!,
    };

    const data = await axios.post(Env.baseUrlSecure + "/root", body, {
      withCredentials: true,
    });

    console.log("data resposta de criacao é: ", data);
  };

  return (
    <Box width={"40%"}>
      <form onSubmit={createAdmin}>
        <TextField
          id="new-name-admin"
          inputRef={name}
          label="Nome"
          variant="outlined"
        />
        <TextField
          id="new-email-admin"
          label="Email"
          inputRef={email}
          variant="outlined"
          type="email"
        />
        <TextField
          id="new-password-admin"
          label="Senha"
          inputRef={password}
          variant="outlined"
          type="password"
        />
        <Button type="submit" variant="contained">
          Criar Admin
        </Button>
      </form>
      ;
    </Box>
  );
}

export default AddAdminTab;
