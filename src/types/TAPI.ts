import TCategory from "./TCategory";
import TProduct from "./TProduct";
import TSubCategory from "./TSubCategory";

type TAPI = {
  categories: TCategory[];
  products: TProduct[];
  subs: TSubCategory[];
};

export default TAPI;
