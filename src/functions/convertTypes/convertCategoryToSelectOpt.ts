import TCategory from "@/types/TCategory";
import TSelectOption from "@/types/TSelectOption";

/**
 * return the options Category with a all select options with id = "0"
 * @param category 
 * @returns TSelectOption[]
 */
const convertCategoryToSelectOpts = (
  category: TCategory[]
): TSelectOption[] => {
  const opts: TSelectOption[] = category.map((opt) => ({
    label: opt.title,
    value: String(opt.id)
  }));

  return [{ label: "tudo", value: "0" }, ...opts];
};

export default convertCategoryToSelectOpts;
