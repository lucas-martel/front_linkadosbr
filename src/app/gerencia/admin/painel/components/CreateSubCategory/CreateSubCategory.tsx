"use client";

import SelectOption from "@/components/Select/SingleSelect/SelectOption";
import TCategory from "@/types/TCategory";
import TSelectOption from "@/types/TSelectOption";
import Env from "@/Variables/Env";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

function CreateSubCategory() {
  const [catOpts, setCatOpts] = useState<TSelectOption[]>([]);
  const subcatSelectRef = useRef<HTMLInputElement>(null);
  const categorieRef = useRef(0);

  const router = useRouter();

  useEffect(() => {
    const fetchCatList = async () => {
      try {
        const data = await axios.get<TCategory[]>(Env.baseUrlSecure + "/cat", {
          withCredentials: true,
        });

        const opts: TSelectOption[] = data.data.map((cat) => ({
          label: cat.title,
          value: cat.id.toString(),
        }));

        setCatOpts(opts);
        categorieRef.current = parseInt(opts[0]?.value ?? 0);
      } catch (error: any) {
        if (error.response) {
          if (error.response.status === 401) {
            alert("você nao está logado com admin!");
            router.push("/gerencia");
          }
        } else {
          alert("algo deu errado");
        }
      }
    };

    fetchCatList();
  }, []);

  const onChangeCategory = (catOpt: string) => {
    categorieRef.current = parseInt(catOpt);
  };

  const onCreateSubCategory = async () => {
    const data = {
      title: subcatSelectRef.current?.value,
      categoryID: categorieRef.current,
    };

    try {
      const dataResp = await axios.post(Env.baseUrlSecure + "/sub", data, {
        withCredentials: true,
      });
      if (dataResp.status === 201) {
        alert(`subcateria ${data.title} criado com sucesso`);
      }
    } catch (error) {
      alert("error ao criar a subcategoria" + data.title);
    }
  };

  return (
    <Box>
      {catOpts.length > 0 && (
        <SelectOption
          items={catOpts}
          selectLabel="Categoria"
          onChange={onChangeCategory}
          resetOnAlterItems={true}
        />
      )}
      <TextField label="subcategoria" inputRef={subcatSelectRef} />
      <Button variant="contained" onClick={onCreateSubCategory}>
        Criar Subcategoria
      </Button>
    </Box>
  );
}

export default CreateSubCategory;
