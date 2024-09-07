"use client"
import { useContext, useEffect, useState } from "react";
import ProductFrame from "@/components/product/ProductFrame";
import { DataContext } from "../../context/data";

function MyLinks() {
  const { products, categories, subs } = useContext(DataContext);
  return (
    <ProductFrame
      categories={categories}
      subs={subs}
      products={products.filter(p => localStorage.getItem(p.id) !== null)}
    />
  );
}

export default MyLinks;
