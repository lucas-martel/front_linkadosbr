import EnumPriceOrder from "@/enums/Enum.PriceOrder";

type TUrlProductParams = {
  categoryID: string | null;
  subcategoryID: string | null;
  productID: string | null;
  min: number | null;
  max: number | null;
  order: EnumPriceOrder | null;
};

export default TUrlProductParams;
