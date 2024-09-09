import { Box } from "@mui/material";
import React, { Dispatch, SetStateAction, useMemo } from "react";

//COMPONENTS
import MultipleSelect from "../Select/MultipleSelect/MultipleSelect";

//HOOKS
import useFilter, { PropUseFilter } from "./Hooks/useFilter";

const FilterProductBar = (props: PropUseFilter) => {
  const {
    selectCatOpts,
    onChangeSelectCategory,
    onChangeSelectSubCategories,
    subCategoriesOnView,
  } = useFilter(props);

  return (
    <>
      <Box display={"flex"}>
        <MultipleSelect
          label="Categoria"
          onChange={onChangeSelectCategory}
          selectOptions={selectCatOpts}
        />

        <MultipleSelect
          key={subCategoriesOnView.join()}
          label="Sub-Categoria"
          onChange={onChangeSelectSubCategories}
          selectOptions={subCategoriesOnView}
        />
      </Box>
    </>
  );
};

export default FilterProductBar;
