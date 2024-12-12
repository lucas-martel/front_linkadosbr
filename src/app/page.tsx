"use client";

import { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

//CONTEXT
import { DataContext } from "../context/data";

// COMPONENTS
import ProductViewer from "@/components/ProductViewer/ProductViewer";
import FilterProductBar from "@/components/FilterProductBar/FilterProductBar";
import useFilter from "@/components/FilterProductBar/Hooks/useFilter";
import TProduct from "@/types/TProduct";
import {
  Box,
  CircularProgress,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ProductCard from "@/components/ProductCard/ProductCard";
import TUrlProductParams from "@/types/TUrlProductParams";
import EnumPriceOrder from "@/enums/Enum.PriceOrder";
import TAPI from "@/types/TAPI";
import Colors from "@/Variables/Colors";

export default function Home() {
  const data = useContext(DataContext);
  // const data: TAPI = { categories: [], products: [], subs: [] };
  const [productsOnView, setProductsOnView] = useState<TProduct[]>([]);
  const theme = useTheme();

  const isBiggerThanMd = useMediaQuery(theme.breakpoints.up("md"));

  if (data === null || data === undefined || data.products.length === 0) {
    return (
      <Box
        width={"100%"}
        height={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <CircularProgress
          sx={{ color: Colors.orange }}
          size={theme.spacing(13)}
        />
        <Typography color={"white"} fontSize={theme.spacing(2)}>Carregando produtos...</Typography>
      </Box>
    );
  }

  return (
    <>
      {data.categories.length > 0 &&
        data.subs.length > 0 &&
        data.products.length > 0 && (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "grid",
              gridTemplateAreas: `"filter"
                                  "viewer"`,
              gridTemplateRows: isBiggerThanMd ? "20% 80%" : "6% 94%",
            }}
          >
            <Box gridArea={"filter"} height={"auto"}>
              <FilterProductBar
                data={data}
                setProductsOnView={setProductsOnView}
              />
            </Box>
            <Box
              gridArea={"viewer"}
              width={"100%"}
              justifyContent={"center"}
              display={"flex"}
              alignContent={"center"}
            >
              {productsOnView.length > 0 && (
                <ProductViewer products={productsOnView} isAdmin={false} />
              )}
            </Box>
          </Box>
        )}
    </>
  );
}
