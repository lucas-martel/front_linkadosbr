"use client";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { DataContext } from "../../context/data";
import FilterProductBar from "@/components/FilterProductBar/FilterProductBar";
import { Box } from "@mui/material";
import ProductViewer from "@/components/ProductViewer/ProductViewer";
import TProduct from "@/types/TProduct";
import serviceFavorite from "@/components/ProductCard/Services/service.favorite";

function MyLinks() {
  const { categories, subs, products } = useContext(DataContext);
  const [productsOnView, setProductsOnView] = useState<TProduct[]>([]);
  const productsFavorite = useRef<TProduct[]>([]);

  useEffect(() => {
    productsFavorite.current = products.filter((p) =>
      isFavoriteOnLocalStorage(p.id)
    );
  }, [products]);

  if (!products && !categories && !products) {
    return <>loding</>;
  }

  const { isFavoriteOnLocalStorage } = serviceFavorite();

  // const searchParams = useSearchParams();

  return (
    <>
      {categories.length > 0 && subs.length > 0 && products.length > 0 && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "grid",
            gridTemplateAreas: `"filter"
                                  "viewer"`,
            gridTemplateRows: "20% 80%",
          }}
        >
          <Box gridArea={"filter"}>
            <FilterProductBar
              data={{
                categories: categories,
                products: productsFavorite.current,
                subs: subs
              }}
              setProductsOnView={setProductsOnView}
            />
          </Box>
          <Box gridArea={"viewer"}>
            <ProductViewer products={productsOnView} isAdmin={false}/>
          </Box>
        </Box>
      )}
    </>
  );
}

export default MyLinks;
