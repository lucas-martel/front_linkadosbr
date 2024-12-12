"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import axios from "axios";
import TAPI from "@/types/TAPI";
import Env from "@/Variables/Env";

export const DataContext = createContext<TAPI>({
  categories: [],
  products: [],
  subs: [],
  requestData: async (reset: boolean) => {
    // Placeholder function, pode ser substituída ao usar o Provider
    console.warn("requestData ainda não foi implementado");
  },
});

const datakeyName = "data";
const urlData = Env.baseUrlSecure + "/store";

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const requestData = async (resetData: boolean) => {
    const data = sessionStorage.getItem(datakeyName);
    if (data === null || resetData) {
      for (let i = 0; i < 5; i++) {
        try {
          const dataAPI = await axios.get(urlData, {
            timeout: 5000,
          });
          const realData = dataAPI.data as TAPI;
          setDataBase(realData);
          sessionStorage.setItem(datakeyName, JSON.stringify(realData));

          return;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response) {
              if (error.response.status === 429) {
                sessionStorage.setItem("error", "429");
                alert(
                  "limite maximo de requisições atingido, espere 5 minutos!"
                );
                return;
              }
            }
          }
          if (i < 4) {
            // RetryDelay: Aguardar antes de tentar novamente
            console.log(`Aguardando antes da próxima tentativa...`);
            await delay(7000);
          }
        }
      }
    } else {
      setDataBase(JSON.parse(data));
    }
  };
  const [dataBase, setDataBase] = useState<Omit<TAPI, "requestData">>({
    categories: [],
    products: [],
    subs: [],
  });

  useEffect(() => {
    requestData(false);
  }, []);

  return (
    <DataContext.Provider value={{ ...dataBase, requestData }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
