"use client";

import TAdminLogin from "@/types/TAdminLogin";
import Env from "@/Variables/Env";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

function LoginAdmin() {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const onClickLogin = async () => {
    const path = Env.baseUrlSecure + Env.loginAcessPath.adminAcess;
    const body: TAdminLogin = {
      email: email.current?.value ?? "",
      password: password.current?.value ?? "",
    };
    if (body.email === "" || body.password === "") {
      alert("campo email ou senha vazios");
      return;
    }
    const data = await axios.post(path, body, {
      withCredentials: true,
    });
    console.log(data);
    if (data.status === 201) {
      router.push("/gerencia/validate/?isRoot=false");
    } else {
      alert("nao foi possível realizar o login");
      router.refresh();
    }
  };

  return (
    <Box>
      <Typography variant="h5">Login Admin</Typography>
      <Box display={"flex"} flexDirection={"column"} width={"70vw"}>
        <TextField
          type="email"
          name="email-admin"
          id="email-login-admin"
          label="email admin"
          placeholder="email..."
          inputRef={email}
        />
        <TextField
          type="password"
          name="password-admin"
          id="password-login-admin"
          label="password admin"
          placeholder="password..."
          inputRef={password}
        />
        <Button variant="contained" onClick={onClickLogin}>
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default LoginAdmin;
