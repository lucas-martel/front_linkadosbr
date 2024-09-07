"use client";

import React, { useState } from "react";
import { Box, Slider, Typography } from "@mui/material";
import SelectOption from "./SelectOption";

interface Prop {
  onChangePriceFilter: (values: number[]) => void;
  onChangeOrderPrice: (value: string) => void;
}

function FilterModal(props: Prop) {
  const [value, setValue] = React.useState<number[]>([0, 40]);
  function valuetext(value: number) {
    return `${value}°C`;
  }
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    props.onChangePriceFilter(newValue as number[]);
  };

  return (
    <>
      <Box sx={{width: "400px", marginRight: "50px"}}>
        <Typography variant="caption" color={"white"}>Limite de Gasto</Typography>
        <Slider
          min={0}
          max={3000}
          getAriaLabel={() => "Limite de gasto"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />
      </Box>
      <Box>
        <SelectOption
          onChange={props.onChangeOrderPrice}
          selectLabel="Ordem do Preço"
          items={[
            { label: "sem ordem", value: "0" },
            { label: "menor para o maior", value: "1" },
            { label: "maior para o menor", value: "2" },
          ]}
        />
      </Box>
    </>
  );
}

export default FilterModal;
