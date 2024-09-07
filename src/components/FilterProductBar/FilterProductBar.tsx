import { Box } from "@mui/material";
import React, { useMemo } from "react";

//COMPONENTS
import MultipleSelect from "../Select/MultipleSelect/MultipleSelect";

//TYPES
import TAPI from "@/types/TAPI";

//FUNCTIONS
import convertCategoryToSelectOpt from "@/functions/convertTypes/convertCategoryToSelectOpt";
import convertSubCategoryToSelectOpts from "@/functions/convertTypes/convertSubCategoryToSelect";

interface Prop {
  data: TAPI;
  onChangeCategory: (categoryIds: string[]) => void;
  onChangeSubCategory: (subCategoryIds: string[]) => void;
}

const FilterProductBar = (props: Prop) => {
  const iniCatOpts = useMemo(
    () => convertCategoryToSelectOpt(props.data.categories),
    [props.data.categories]
  );
  const iniSubOpts = useMemo(
    () => convertSubCategoryToSelectOpts(props.data.subs),
    [props.data.subs]
  );

  return (
    <>
      <Box display={"flex"}>
        <MultipleSelect
          label="Categoria"
          initOptionsSelecteds={iniCatOpts}
          onChange={props.onChangeCategory}
          selectOptions={iniCatOpts}
        />

        <MultipleSelect
          label="Sub-Categoria"
          initOptionsSelecteds={iniSubOpts}
          onChange={props.onChangeSubCategory}
          selectOptions={convertSubCategoryToSelectOpts(props.data.subs)}
        />
      </Box>
    </>
  );
};

export default FilterProductBar;
