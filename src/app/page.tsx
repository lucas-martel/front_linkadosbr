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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ProductCard from "@/components/ProductCard/ProductCard";
import TUrlProductParams from "@/types/TUrlProductParams";
import EnumPriceOrder from "@/enums/Enum.PriceOrder";

export default function Home() {
  const data = useContext(DataContext);
  const [productsOnView, setProductsOnView] = useState<TProduct[]>([]);
  const theme = useTheme();

  const isBiggerThanMd = useMediaQuery(theme.breakpoints.up("md"));

  // const searchParams = useSearchParams();

  // const params: TUrlProductParams = {
  //   categoryID: searchParams.get("cat"),
  //   subcategoryID: searchParams.get("sub"),
  //   productID: searchParams.get("product"),
  //   min: parseFloat(searchParams.get("min") ?? "0"),
  //   max: parseFloat(searchParams.get("max") ?? "10000"),
  //   order: parseInt(searchParams.get("order") ?? `${EnumPriceOrder.noOrder}`),
  // };

  if (data === null || data === undefined || data.products.length === 0) {
    return (
      <CircularProgress
        sx={{ color: "secondary.dark" }}
        size={theme.spacing(13)}
      />
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
