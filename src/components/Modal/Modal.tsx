import { Box, IconButton } from "@mui/material";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";

type BtnChoice = {
  title: string;
  onClick: () => void;
};

interface Props {
  children: React.ReactNode;
  leftButton?: BtnChoice;
  rightButton?: BtnChoice;
  isOpen: boolean;
  onClose: () => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 21,
  p: 4,
};

function GenericModal({
  children,
  leftButton,
  rightButton,
  isOpen,
  onClose,
}: Props) {

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
        {children}
        <Box width={"100%"} display={"flex"} justifyContent={"space-around"}>
          {leftButton && (
            <Button variant="contained" onClick={leftButton.onClick}>{leftButton.title}</Button>
          )}
          {rightButton && (
            <Button variant="contained" onClick={rightButton.onClick}>{rightButton.title}</Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
}

export default GenericModal;
