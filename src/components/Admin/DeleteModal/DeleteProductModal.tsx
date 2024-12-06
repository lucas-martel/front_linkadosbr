import GenericModal from "@/components/Modal/Modal";
import { IconButton, Tooltip, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  title: string;
}
function DeleteProductModal(prop: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const onDeleteProduct = () => {};

  return (
    <>
      <GenericModal
        isOpen={isOpen}
        leftButton={{ title: "sim", onClick: onDeleteProduct }}
        rightButton={{ title: "não", onClick: onClose }}
        onClose={onClose}
      >
        <Typography color={"white"}>você realmente quer deletar {prop.title}?</Typography>
      </GenericModal>
      <Tooltip title="deletar produto">
        <IconButton
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}

export default DeleteProductModal;
