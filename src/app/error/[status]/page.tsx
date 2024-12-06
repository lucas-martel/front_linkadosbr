// "use client";

import React from "react";
import { useParams } from "next/navigation";

export function generateStaticParams() {
  // Defina os parâmetros que deseja pre-renderizar
  return [{ status: "429" }, { status: "500" }];
}

function getMsg(status: string): string {
  switch (status) {
    case "429":
      return "olá! você chegou ao limite de requisições do nosso site, mas daqui a 5 minutinhos você vai poder ver os melhores links para produtos escolhidos a dedo por nós.";
    case "500":
      return "";
  }
  return "";
}

function Error({ params }: { params: { status: string } }) {
  return <div>{getMsg(params.status)}</div>;
}

export default Error;
