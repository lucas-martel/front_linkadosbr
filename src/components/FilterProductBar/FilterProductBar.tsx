import {
  Box,
  Button,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

//ICONS
import CloseIcon from "@mui/icons-material/Close";

//COMPONENTS
import MultipleSelect from "../Select/MultipleSelect/MultipleSelect";
import RangeSlider from "../Sliders/RangeSlider/RangeSlider";

//HOOKS
import useFilter, { PropUseFilter } from "./Hooks/useFilter";
import Colors from "@/Variables/Colors";
import SelectOption from "../Select/SingleSelect/SelectOption";
import EnumPriceOrder from "@/enums/Enum.PriceOrder";
import SearchBar from "../SearchBar/SearchBar";
import TSelectOption from "@/types/TSelectOption";
import { DataContext } from "@/context/data";
import TUrlProductParams from "@/types/TUrlProductParams";

interface prop {
  onChangeSelectCategory: (categoryIds: string[]) => void;
  selectCatOpts: TSelectOption[];
  onChangeSelectSubCategories: (subCategoryIds: string[]) => void;
  subCategoriesOnView: TSelectOption[];
  onChangePriceFilter: (values: number[]) => void;
  handleOrderFilter: (value: string) => void;
  search: (value: string) => void;
}

const RenderByRow = (props: prop) => {
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-around"}
        alignItems={"center"}
        bgcolor={Colors.productViewerBg}
        height={"90%"}
        width={"100vw"}
        sx={{ overflowY: "auto", overflowX: "auto"}}
        columnGap={2}
      >
        {RenderFilters(props)}
      </Box>
    </>
  );
};

const RenderFilters = (props: prop) => {
  return (
    <>
      <MultipleSelect
        label="Categoria"
        onChange={props.onChangeSelectCategory}
        selectOptions={props.selectCatOpts}
      />

      <MultipleSelect
        key={props.subCategoriesOnView.join()}
        label="Sub-Categoria"
        onChange={props.onChangeSelectSubCategories}
        selectOptions={props.subCategoriesOnView}
      />
      <RangeSlider
        label="filtro de preço"
        min={0}
        max={10000}
        onChangeRange={props.onChangePriceFilter}
      />
      <SelectOption
        items={[
          { label: "sem ordem", value: String(EnumPriceOrder.noOrder) },
          { label: "por nome", value: String(EnumPriceOrder.perName) },
          { label: "maior preço", value: String(EnumPriceOrder.moreToLess) },
          { label: "menor preço", value: String(EnumPriceOrder.lessToMore) },
        ]}
        onChange={props.handleOrderFilter}
        resetOnAlterItems={false}
        selectLabel="Ordenar Por:"
      />
      <SearchBar placeholder="Pesquisar Produto" onSearch={props.search} />
    </>
  );
};

const RenderByDrawer = (
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  props: prop
) => {
  return (
    <>
      <Button
        variant="contained"
        sx={{ backgroundColor: "secondary.main" }}
        onClick={() => {
          setOpen(true);
        }}
      >
        Filtros
      </Button>
      <Drawer
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "rgba(61, 62, 55, 0.98)",
          },
        }}
      >
        <Box
          width={"90vw"}
          display={"flex"}
          flexDirection={"column"}
          gap={4}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <IconButton
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>
          {RenderFilters(props)}
        </Box>
      </Drawer>
    </>
  );
};

const FilterProductBar = (props: PropUseFilter) => {
  const prop = useFilter(props);

  const theme = useTheme();

  const isBiggerThanMd = useMediaQuery(theme.breakpoints.up("md"));

  const [open, setOpen] = useState(true);

  return isBiggerThanMd
    ? RenderByRow(prop)
    : RenderByDrawer(open, setOpen, prop);
};

export default FilterProductBar;
