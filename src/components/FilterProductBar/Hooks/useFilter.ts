import TProduct from "@/types/TProduct";
import TSubCategory from "@/types/TSubCategory";
import { useState } from "react";

interface Prop {
  products: TProduct[];
  subCategories: TSubCategory[];
}

const useFilter = (props: Prop) => {
  const [productOnView, setProductOnView] = useState<TProduct[]>([]);
  const [subCategoriesOnView, setSubCategoriesOnView] = useState<
    TSubCategory[]
  >([]);

  const onChangeSelectCategory = (categoryIds: string[]) => {
    const filtered = props.subCategories.filter(
      (sc) => categoryIds.indexOf(String(sc.categoryID)) !== -1
    );
    onChangeSelectSubCategories(filtered.map((f) => String(f.id)));
  };

  const onChangeSelectSubCategories = (subCategoryIds: string[]) => {
    setProductOnView(
      props.products.filter(
        (p) => subCategoryIds.indexOf(String(p.subcategoryID)) !== -1
      )
    );
    setSubCategoriesOnView(
      props.subCategories.filter(
        (s) => subCategoryIds.indexOf(String(s.id)) !== -1
      )
    );
  };

  return {
    subCategoriesOnView,
    productOnView,
    onChangeSelectCategory,
    onChangeSelectSubCategories,
  };
};

export default useFilter;
