import TCategory from "@/types/TCategory";
import TSelectOption from "@/types/TSelectOption";

const convertCategoryToSelectOpts = (category: TCategory[]): TSelectOption[] => {
  const opts: TSelectOption[] = category.map((opt) => ({
    label: opt.title,
    value: String(opt.id),
  }));

  return opts;
};

export default convertCategoryToSelectOpts;
