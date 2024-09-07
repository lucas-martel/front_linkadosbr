"use client";

import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

//CONTEXT
import { DataContext } from "../context/data";

// COMPONENTS
import ProductViewer from "@/components/ProductViewer/ProductViewer";
import FilterProductBar from "@/components/FilterProductBar/FilterProductBar";
import useFilter from "@/components/FilterProductBar/Hooks/useFilter";

export default function Home() {
  const data = useContext(DataContext);

  const { subCategoriesOnView, productOnView, onChangeSelectCategory, onChangeSelectSubCategories } =
    useFilter({
      products: data.products,
      subCategories: data.subs,
    });

  // const searchParams = useSearchParams();

  return (
    <>
      {data.categories.length > 0 && (
        <FilterProductBar
          data={{
            categories: data.categories,
            products: data.products,
            subs: subCategoriesOnView,
          }}
          onChangeCategory={onChangeSelectCategory}
          onChangeSubCategory={onChangeSelectSubCategories}
        />
      )}
      <ProductViewer products={productOnView} />
    </>
  );
}
