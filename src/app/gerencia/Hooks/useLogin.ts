"use client";

import TAdminLogin from "@/types/TAdminLogin";
import Env from "@/Variables/Env";
import axios, { AxiosError, AxiosResponse, isAxiosError } from "axios";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import https from "https";

interface Props {
  isRoot: boolean;
}

const useLogin = (props: Props) => {
  const router = useRouter();

  const tryLoginRoot = async () => {
    const path = Env.baseUrlSecure + Env.loginAcessPath.rootAcess;
    const data = await axios.get(path, {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false, // Aceita certificados autoassinados
      }),
      withCredentials: true,
    });
    console.log(data.data);
  };

  const tryLoginAdmin = async (body: TAdminLogin) => {
    const path = Env.baseUrlSecure + Env.loginAcessPath.adminAcess;
    const data = await axios.post(path, body);
    console.log(data);
  };

  const tryAccessCode = async (code: string, pathRouter: string) => {
    const path = Env.baseUrlSecure + Env.loginAcessPath.tryCode;
    try {
      const data = await axios.post(
        path,
        {
          code: code,
        },
        {
          httpsAgent: new https.Agent({
            rejectUnauthorized: true,
          }),
          withCredentials: true,
        }
      );

      if (data.data.code === true) {
        alert("autenticação feita com successo");
        router.replace(pathRouter);
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        alert("erro de autenticacao"+ error.message);
      }
      console.log("tentativa de teste: ", error);
    }
  };
  return { tryLoginRoot, tryLoginAdmin, tryAccessCode };
};

export default useLogin;
