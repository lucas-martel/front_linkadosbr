import {
  Box,
  Divider,
  Pagination,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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
import TUrlProductParams from "@/types/TUrlProductParams";

interface Props {
  products: TProduct[];
  isAdmin: boolean;
}

/**
 * ProductCard is a component shows the productCard component
 */

function ProductViewer({ products, isAdmin }: Props) {
  const {
    countPagination,
    currentPage,
    onChangeCurrentPage,
    products: productsOnViewer,
  } = usePagination({
    itensPerPage: Env.itensPerPage,
    allProducts: products,
  });

  const theme = useTheme();

  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

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
        direction={"row"}
        flexWrap={"wrap"}
        justifyContent={"center"}
        sx={{ overflowY: "auto", gap: 2, width: "100%"}}
      >
        {productsOnViewer?.map((product) => (
          <ProductCard key={product.id} product={product} isAdmin={isAdmin} />
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
