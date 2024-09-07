"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import axios from "axios";
import TAPI from "@/types/TAPI";

export const DataContext = createContext<TAPI>({
  categories: [],
  products: [],
  subs: [],
});

const datakeyName = "data";
const urlData = "http://127.0.0.1:3001/v1/store";

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [dataBase, setDataBase] = useState<TAPI>({
    categories: [],
    products: [],
    subs: [],
  });

  const RequestData = async () => {
    const data = sessionStorage.getItem(datakeyName);
    if (data === null) {
      const dataAPI = await axios.get(urlData);
      const realData = dataAPI.data as TAPI;
      setDataBase(realData);
      sessionStorage.setItem(datakeyName, JSON.stringify(realData));
    } else {
      setDataBase(JSON.parse(data));
    }
  };

  useEffect(() => {
    RequestData();
  }, []);

  return (
    <DataContext.Provider value={dataBase}>{children}</DataContext.Provider>
  );
};

export default DataProvider;
