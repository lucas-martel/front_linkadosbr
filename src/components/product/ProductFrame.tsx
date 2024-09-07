import React, { useEffect, useState } from "react";
import Nav from "./navigation/Nav";
import ProductViewer from "../ProductViewer/ProductViewer";
import {
  TypeCategory,
  TypeProduct,
  TypeSubCategory,
} from "@/types/TypesDataBase";
import TypeSelectOption from "@/types/TypeSelectOption";

interface Props {
  products: TypeProduct[];
  categories: TypeCategory[];
  subs: TypeSubCategory[];
}

function ProductFrame(props: Props) {
  const [productsOnView, setProductsOnView] = useState<TypeProduct[]>([]);
  const [productsFiltered, setProductsFiltered] = useState<TypeProduct[]>([]);

  function onChangeSelected(cat: string, sub: string) {
    if (cat === "0") {
      const products = props.products.filter(
        (p) => sub === "0" || String(p.subcategoryID) === sub
      );
      setProductsOnView(products);
    } else {
      const products = props.products.filter(
        (p) =>
          String(p.categoryID) === cat &&
          (String(p.subcategoryID) === sub || sub === "0")
      );
      setProductsOnView(products);
      setProductsFiltered(products);
    }
  }

  function onChangePriceFilter(values: number[]) {
    const productsFiltered = productsOnView.filter(
      (p) => p.Price[0].value >= values[0] && p.Price[0].value <= values[1]
    );
    setProductsFiltered(productsFiltered);
  }

  function onChangeOrderPrice(option: string) {
    if (option === "0") {
      setProductsFiltered(productsOnView);
      return;
    }
    const copy = [...productsFiltered];
    if (option === "1") {
      setProductsFiltered(
        copy.sort((a, b) => a.Price[0].value - b.Price[0].value)
      );
    } else {
      setProductsFiltered(
        copy.sort((b, a) => a.Price[0].value - b.Price[0].value)
      );
    }
  }

  return (
    <>
      <Nav
        categories={props.categories}
        subcategories={props.subs}
        onChangeSelected={onChangeSelected}
        onChangePriceFilter={onChangePriceFilter}
        onChangeOrderPrice={onChangeOrderPrice}
      />
      <ProductViewer
        products={props.products}
      />
    </>
  );
}

export default ProductFrame;
