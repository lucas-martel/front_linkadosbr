"use client";

import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

//CONTEXT
import { DataContext } from "../context/data";

// COMPONENTS
import ProductViewer from "@/components/ProductViewer/ProductViewer";
import FilterProductBar from "@/components/FilterProductBar/FilterProductBar";
import useFilter from "@/components/FilterProductBar/Hooks/useFilter";
import TProduct from "@/types/TProduct";
import { Box } from "@mui/material";
import { useRouter } from "next/router";

export default function Home() {
  const data = useContext(DataContext);
  const [productsOnView, setProductsOnView] = useState<TProduct[]>([]);

  // const searchParams = useSearchParams();

  if (!data) {
    return <div>carregando...</div>;
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
              gridTemplateRows: "10% 90%",
            }}
          >
            <Box gridArea={"filter"}>
              <FilterProductBar
                data={data}
                setProductsOnView={setProductsOnView}
              />
            </Box>
            <Box gridArea={"viewer"}>
              <ProductViewer products={productsOnView} />
            </Box>
          </Box>
        )}
    </>
  );
}
