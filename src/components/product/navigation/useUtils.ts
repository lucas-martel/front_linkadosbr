import TypeSelectOption from "@/types/TypeSelectOption";
import { TypeCategory, TypeSubCategory } from "@/types/TypesDataBase";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";

interface Props {
  categories: TypeCategory[];
  subcategories: TypeSubCategory[];
  onChange: (catSelected: string, subSelected: string) => void;
}

function useUtils(props: Props) {
  const [catOpts, setCatOpts] = useState<TypeSelectOption[]>([]);
  const [subOpts, setSubOpts] = useState<TypeSelectOption[]>([]);

  const catSelected = useRef("0");
  const subSelected = useRef("0");

  useEffect(() => {
    const catOptions: TypeSelectOption[] = props.categories.map((c) => ({
      label: c.title,
      value: String(c.id),
    }));

    setCatOpts([{ label: "tudo", value: "0" }, ...catOptions]);
    onChangeCategorySelected("0");
  }, [props.categories]); // `props.categories` é uma dependência correta aqui

  const onChangeCategorySelected = useCallback(
    (value: string) => {
      catSelected.current = value;
      const filterSubOpts = props.subcategories.filter(
        (sub) => value === "0" || String(sub.categoryID) === value
      );

      const subOptions: TypeSelectOption[] = filterSubOpts.map((s) => ({
        label: s.title,
        value: String(s.id),
      }));

      setSubOpts([{ label: "tudo", value: "0" }, ...subOptions]);
    },
    [props.subcategories]
  );

  const onChangeSubCategorySelected = useCallback(
    (value: string) => {
      subSelected.current = value;
      props.onChange(catSelected.current, subSelected.current);
    },
    [props.categories, props.subcategories]
  );

  // Retorne as opções e as funções para o componente pai
  return useMemo(
    () => ({
      catOpts,
      subOpts,
      onChangeCategorySelected,
      onChangeSubCategorySelected,
    }),
    [catOpts, subOpts, onChangeCategorySelected, onChangeSubCategorySelected]
  );
}

export default useUtils;
