import TSelectOption from "@/types/TSelectOption";
import TSubCategory from "@/types/TSubCategory";

const convertSubCategoryToSelectOpts = (
  subCategory: TSubCategory[]
): TSelectOption[] => {
  const opts: TSelectOption[] = subCategory.map((opt) => ({
    label: opt.title,
    value: String(opt.id),
    isChecked: true,
  }));

  return [{ label: "tudo", isChecked: true, value: "0" }, ...opts];
};

export default convertSubCategoryToSelectOpts;
