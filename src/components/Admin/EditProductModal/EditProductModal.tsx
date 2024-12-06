import TProduct from "@/types/TProduct";
import { Box, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

interface Props {
  product: TProduct;
}

function EditProductModal(prop: Props) {
  const { register, handleSubmit } = useForm();

  return (
    <Box>
      <Box>
        <TextField type="text" {...register("title")} />
      </Box>
    </Box>
  );
}

export default EditProductModal;
