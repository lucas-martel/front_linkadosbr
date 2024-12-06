"use client";

import { Box, Button, Input, TextField, Typography } from "@mui/material";
import React, { Suspense, useEffect, useRef, useState } from "react";
import useLogin from "../Hooks/useLogin";
import { useSearchParams } from "next/navigation";

type Params = {
  isRoot: string; // O valor do parâmetro dinâmico
};

function Auth() {
  // const params = useParams() as Params;

  const [isRoot, setIsRoot] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const isRoot_ = searchParams.get("isRoot");
    setIsRoot(isRoot_ === "true");
  }, [searchParams]);

  const [disableGerar, setDisableGerar] = useState(!isRoot);

  const codeInput = useRef<HTMLInputElement>(null);

  const { tryLoginRoot, tryAccessCode } = useLogin({
    isRoot: isRoot,
  });

  return (
    <Box>
      {isRoot && (
        <Button
          variant="contained"
          onClick={() => {
            tryLoginRoot();
            setDisableGerar(true);
          }}
          disabled={disableGerar}
        >
          Gerar codigo root
        </Button>
      )}
      {disableGerar && (
        <>
          <Box display={"flex"} flexDirection={"column"}>
            <TextField label="codigo" inputRef={codeInput} />
            <Typography variant="caption" color={"red"} display={"block"}>
              Codigo de acesso incorreto
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={() =>
              tryAccessCode(
                codeInput.current?.value ?? "",
                isRoot ? "/gerencia/painel/root" : "/gerencia/admin/painel"
              )
            }
          >
            Entrar
          </Button>
        </>
      )}
    </Box>
  );
}

const Page = () => {
  return (
    <Suspense fallback={<div>...loading</div>}>
      <Auth />
    </Suspense>
  );
};

export default Page;
