import { Box, Typography } from "@mui/material";
import React from "react";
import CreateProduct from "./components/CreateProduct/CreateProduct";
import TabComponent from "@/components/Tab/TabComponent";
import CreateCategory from "./components/CreateCategory/CreateCategory";
import CreateSubCategory from "./components/CreateSubCategory/CreateSubCategory";

function PanelAdmin() {
  return (
    <TabComponent
      tabs={[
        { label: "criação de produto", component: <CreateProduct /> },
        { label: "criação de categoria", component: <CreateCategory /> },
        { label: "criação de subCategoria", component: <CreateSubCategory /> },
      ]}
    />
  );
}

export default PanelAdmin;
