import convertCategoryToSelectOpt from "@/functions/convertTypes/convertCategoryToSelectOpt";
import convertSubCategoryToSelectOpts from "@/functions/convertTypes/convertSubCategoryToSelect";
import TAPI from "@/types/TAPI";
import TCategory from "@/types/TCategory";
import TProduct from "@/types/TProduct";
import TSelectOption from "@/types/TSelectOption";
import TSubCategory from "@/types/TSubCategory";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

export interface PropUseFilter {
  // products: TProduct[];
  // categories: TCategory[];
  // subCategories: TSubCategory[];
  data: TAPI;
  setProductsOnView: Dispatch<SetStateAction<TProduct[]>>;
}

const useFilter = (props: PropUseFilter) => {
  const selectCatOpts = useMemo(
    () => convertCategoryToSelectOpt(props.data.categories),
    [props.data.categories]
  );

  const [subCategoriesOnView, setSubCategoriesOnView] = useState<
    TSelectOption[]
  >([]);

  const onChangeSelectCategory = (categoryIds: string[]) => {
    const filtered = props.data.subs.filter((sc) =>
      categoryIds.includes(String(sc.categoryID))
    );
    setSubCategoriesOnView(convertSubCategoryToSelectOpts(filtered));
  };

  const onChangeSelectSubCategories = (subCategoryIds: string[]) => {
    const products = props.data.products.filter((p) =>
      subCategoryIds.includes(String(p.subcategoryID))
    );

    props.setProductsOnView(products);
  };

  useEffect(() => {
    onChangeSelectSubCategories(subCategoriesOnView.map((s) => s.value));
  }, [subCategoriesOnView]);

  return {
    selectCatOpts,
    subCategoriesOnView,
    onChangeSelectCategory,
    onChangeSelectSubCategories,
  };
};

export default useFilter;
