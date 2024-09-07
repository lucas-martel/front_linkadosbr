import TSelectOption from "@/types/TSelectOption";
import TSubCategory from "@/types/TSubCategory";

const convertSubCategoryToSelectOpts = (
  subCategory: TSubCategory[]
): TSelectOption[] => {
  const opts: TSelectOption[] = subCategory.map((opt) => ({
    label: opt.title,
    value: String(opt.id),
  }));

  return opts;
};

export default convertSubCategoryToSelectOpts;
