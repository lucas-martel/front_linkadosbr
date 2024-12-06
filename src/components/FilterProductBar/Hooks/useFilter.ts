import EnumPriceOrder from "@/enums/Enum.PriceOrder";
import convertCategoryToSelectOpt from "@/functions/convertTypes/convertCategoryToSelectOpt";
import convertSubCategoryToSelectOpts from "@/functions/convertTypes/convertSubCategoryToSelect";
import TAPI from "@/types/TAPI";
import TCategory from "@/types/TCategory";
import TProduct from "@/types/TProduct";
import TSelectOption from "@/types/TSelectOption";
import TSubCategory from "@/types/TSubCategory";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import * as filterAPI from "../functions/FilterApi";
import TFilter from "@/types/TFilter";
import IsOnPrice from "../functions/IsOnPrice";

export interface PropUseFilter {
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

  useEffect(() => {
    filter();
  }, [props.data.products]);

  const onChangeSelectCategory = (categoryIds: string[]) => {
    filterAPI.saveFilter("cat", categoryIds);

    const filtered = props.data.subs.filter((sc) =>
      categoryIds.includes(String(sc.categoryID))
    );
    setSubCategoriesOnView(convertSubCategoryToSelectOpts(filtered));
  };

  const onChangeSelectSubCategories = (subCategoryIds: string[]) => {
    filterAPI.saveFilter("sub", subCategoryIds);
    filter();
  };

  const handleOrderFilter = (value: string) => {
    filterAPI.saveFilter("order", parseInt(value));
    filter();
  };

  const onChangePriceFilter = (values: number[]) => {
    filterAPI.saveFilter("price", [values[0], values[1]]);
    filter();
  };

  const filter = () => {
    const filters = filterAPI.getFilter() as TFilter;
    if (Object.keys(filters).length === 0) {
      props.setProductsOnView(props.data.products);
    }

    const prices = filters.price
      ? [filters.price[0], filters.price[1]]
      : [0, 2000];

    let products: TProduct[] = [];

    // Filtra os produtos por subcategoria e preço
    products = props.data.products.filter((p) => {
      const isSubcategoryMatch = filters.sub
        ? filters.sub.includes(String(p.subcategoryID))
        : true;
      const isPriceMatch = IsOnPrice(prices, p.Price[0].value);
      return isSubcategoryMatch && isPriceMatch;
    });

    if (filters.order !== undefined) {
      switch (filters.order) {
        case EnumPriceOrder.perName:
          products = products.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case EnumPriceOrder.lessToMore:
          products = products.sort(
            (a, b) => a.Price[0].value - b.Price[0].value
          );
          break;
        case EnumPriceOrder.moreToLess:
          products = products.sort(
            (a, b) => b.Price[0].value - a.Price[0].value
          );
          break;
      }
    }
    props.setProductsOnView(products);
  };

  const search = (value: string) => {
    const hasValue = new RegExp(value, "i");

    props.setProductsOnView(
      props.data.products.filter(
        (p) => hasValue.test(p.title) || hasValue.test(p.tags)
      )
    );
  };

  useEffect(() => {
    onChangeSelectSubCategories(subCategoriesOnView.map((s) => s.value));
  }, [subCategoriesOnView]);

  return {
    selectCatOpts,
    subCategoriesOnView,
    onChangeSelectCategory,
    onChangeSelectSubCategories,
    onChangePriceFilter,
    handleOrderFilter,
    search,
  };
};

export default useFilter;
