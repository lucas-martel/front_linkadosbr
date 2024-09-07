import { Box, Divider, Pagination, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";

// COMPONENTS
import ProductCard from "../ProductCard/ProductCard";

//TYPES
import TProduct from "@/types/TProduct";

// HOOKS
import usePagination from "./Hooks/usePagination";

// VARIABLES
import Env from "@/Variables/Env";
import Colors from "@/Variables/Colors";

interface Props {
  products: TProduct[];
}

/**
 * ProductCard is a component shows the productCard component
 */

function ProductViewer({ products }: Props) {
  const {
    countPagination,
    currentPage,
    onChangeCurrentPage,
    products: productsOnViewer,
  } = usePagination({
    itensPerPage: Env.itensPerPage,
    allProducts: products,
  });

  return (
    <Box
      display={"flex"}
      flexDirection={"column-reverse"}
      justifyContent={"flex-end"}
      alignItems={"center"}
      rowGap={"1em"}
      width={"95%"}
      height={"95%"}
      bgcolor={Colors.productViewerBg}
      borderRadius={3}
      margin={"auto"}
      p={2}
    >
      <Stack
        direction="row"
        flexWrap={"wrap"}
        justifyContent="center"
        alignItems="center"
        spacing={2}
        gap={4}
        sx={{ overflowY: "auto" }}
      >
        {productsOnViewer?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Stack>
      <Divider orientation="horizontal" flexItem />
      <Pagination
        count={countPagination}
        page={currentPage}
        shape="circular"
        onChange={onChangeCurrentPage}
      />
    </Box>
  );
}

export default ProductViewer;
