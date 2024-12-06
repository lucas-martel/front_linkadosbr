import EnumPriceOrder from "@/enums/Enum.PriceOrder";

type TFilter = {
  cat?: string[];
  sub?: string[];
  price?: number[];
  order?: EnumPriceOrder;
};

export default TFilter;
