import { Box, Paper } from "@mui/material";
import SelectOption from "@/components/SelectOption";
import TypeSelectOption from "@/types/TypeSelectOption";
import SearchProducts from "../SearchProducts";

import { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "@/context/data";
import * as TypesDataBase from "@/types/TypesDataBase";
import useUtils from "./useUtils";
import FilterModal from "@/components/FilterModal";
import MultipleSelect from "@/components/Select/MultipleSelect/MultipleSelect";

interface Prop {
  categories: TypesDataBase.TypeCategory[];
  subcategories: TypesDataBase.TypeSubCategory[];
  onChangeSelected: (cat: string, sub: string) => void;
  onChangePriceFilter: (values: number[]) => void;
  onChangeOrderPrice: (value: string) => void;
}

function createASelectOptionComponent(
  onChangeFunction: (value: string) => void,
  values: TypeSelectOption[],
  selectLabel: string,
  resetOnAlterItems: boolean
) {
  return (
    <Box minWidth={"100px"} marginRight={"5em"}>
      <SelectOption
        items={values}
        onChange={onChangeFunction}
        selectLabel={selectLabel}
        resetOnAlterItems={resetOnAlterItems}
      />
    </Box>
  );
}

function Nav(props: Prop) {
  const teste = (values: string[]) => {
    console.log("dentro de teste: ", values);
  };

  const {
    catOpts,
    subOpts,
    onChangeCategorySelected,
    onChangeSubCategorySelected,
  } = useUtils({
    categories: props.categories,
    subcategories: props.subcategories,
    onChange: props.onChangeSelected,
  });
  return (
    <Box
      maxWidth={"100vw"}
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      padding={"5px"}
      sx={{ bgcolor: "secondary.main" }}
    >
      <Box display={"flex"} flexDirection={"row"} flexWrap={"nowrap"}>
        {catOpts.length > 0 && subOpts.length > 0 && (
          <MultipleSelect selectOptions={catOpts} onChange={teste} />
        )}
        {/* {catOpts.length > 0 &&
          createASelectOptionComponent(
            onChangeCategorySelected,
            catOpts,
            "Categoria",
            true
          )}
        {subOpts.length > 0 &&
          createASelectOptionComponent(
            onChangeSubCategorySelected,
            subOpts,
            "Subcategoria",
            true
          )} */}
      </Box>
      <Box
        sx={{
          minWidth: "600px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
        }}
      >
        <FilterModal
          onChangePriceFilter={props.onChangePriceFilter}
          onChangeOrderPrice={props.onChangeOrderPrice}
        />
      </Box>
      <Box>
        <SearchProducts />
      </Box>
    </Box>
  );
}

export default Nav;
