"use client";

import SelectOption from "@/components/Select/SingleSelect/SelectOption";
import { DataContext } from "@/context/data";
import CreateProductDto from "@/types/CreateProductDto";
import TSelectOption from "@/types/TSelectOption";
import Env from "@/Variables/Env";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios, { isAxiosError } from "axios";
import React, { useContext, useRef, useState } from "react";

/*
  "title": "string",
  "link": "string",
  "categoryID": number
  "subcategoryID": number
  "tags": "string",
  "value": number,
  "imgLink": string
*/

function CreateProduct() {
  const { categories, subs, requestData } = useContext(DataContext);

  const [subsOnView, setsubsOnView] = useState<TSelectOption[]>([]);

  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const catID = useRef("");
  const subCatID = useRef("");
  const tagsRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const catOptions: TSelectOption[] =
    categories?.map((cat) => ({
      label: cat.title,
      value: cat.id.toString(),
    })) || [];

  const handleSelectCategory = (value: string) => {
    catID.current = value;
    changeSubs();
  };

  const changeSubs = () => {
    const filter = subs?.filter(
      (sub) => sub.categoryID.toString() === catID.current
    );

    const subcatOptions =
      filter.map((sub) => ({
        label: sub.title,
        value: sub.id.toString(),
      })) || [];
    setsubsOnView(subcatOptions);
    subCatID.current = subcatOptions[0].value;
  };

  const handleSubSelectCategory = (value: string) => {
    subCatID.current = value;
  };

  const onCreateProduct = async () => {
    const productToCreate: CreateProductDto = {
      title: titleRef.current?.value ?? "",
      link: linkRef.current?.value ?? "",
      categoryID: parseInt(catID.current),
      subcategoryID: parseInt(subCatID.current),
      tags: tagsRef.current?.value ?? "",
      imgLink: imgRef.current?.value ?? "",
      value: parseInt(priceRef.current?.value ?? "0"),
    };

    try {
      const data = await axios.post(
        Env.baseUrlSecure + "/product",
        productToCreate,
        { withCredentials: true }
      );
      console.log(data);
      alert("produto criado com sucesso!" + data.status);
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
        alert(
          "erro na criacao do produdo" + JSON.stringify(error.response?.data)
        );
      }
    }
  };

  const updateList = () => {
    if (requestData) {
      requestData(true)
        .then((data) => alert("atualizado com sucesso!"))
        .catch((error) => alert("algo de errado ocorreu!"));
    }
  };

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Typography variant="h5">Criar produto</Typography>
      <Button onClick={updateList} variant="contained">
        Atualizar lista
      </Button>
      <TextField label="título" inputRef={titleRef} />
      <TextField label="link" inputRef={linkRef} />
      <SelectOption
        selectLabel="Categoria"
        items={catOptions}
        onChange={handleSelectCategory}
        resetOnAlterItems={false}
      />
      {subsOnView.length > 0 && (
        <SelectOption
          selectLabel="SubCategoria"
          items={subsOnView}
          onChange={handleSubSelectCategory}
          resetOnAlterItems={true}
        />
      )}
      <TextField label="tags" inputRef={tagsRef} />
      <TextField label="price" type="number" inputRef={priceRef} />
      <TextField label="image link" inputRef={imgRef} />
      <Button variant="contained" onClick={onCreateProduct}>
        Criar Produto
      </Button>
    </Box>
  );
}

export default CreateProduct;
