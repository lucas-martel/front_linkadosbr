import { Height } from "@mui/icons-material";
import { Box, Slider, Stack, TextField } from "@mui/material";
import React, { useEffect, useRef } from "react";

interface Prop {
  min: number;
  max: number;
  label: string;
  onChangeRange: (value: number[]) => void;
}

function RangeSlider(prop: Prop) {
  const [value, setValue] = React.useState<number[]>([prop.min, prop.max]);

  const auxValue = useRef<number[]>([prop.min, prop.max]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleChangeInput = (value_: number, isMin: boolean) => {
    auxValue.current = isMin ? [value_, value[1]] : [value[0], value_]
    // setValue((prev) => (isMin ? [value, prev[1]] : [prev[0], value]));
  };

  const handleKeyDown = (event:  React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setValue(auxValue.current)
    }
  }

  useEffect(() => {
    prop.onChangeRange(value);
  }, [value]);

  return (
    <Box width={300} display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <Box sx={{ width: "90%" }}>
        <Slider
          size="small"
          getAriaLabel={() => prop.label}
          min={prop.min}
          max={prop.max}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={(value, index) =>
            index === 0 ? `minimo ${value}` : `maximo ${value}`
          }
          sx={{ bgcolor: "secondary.main", color: "secondary.light" }}
        />
      </Box>
      <Box width={300} display={"flex"} flexDirection={"row"} columnGap={1}>
        <TextField
          id="outlined-basic"
          label="preço minimo"
          variant="outlined"
          onKeyDown={handleKeyDown}
          onChange={(event) => {
            handleChangeInput(parseInt(event.target.value), true);
          }}
          size="small"
        />
        <TextField
          id="outlined-basic"
          label="preço máximo"
          variant="outlined"
          onKeyDown={handleKeyDown}
          onChange={(event) => {
            handleChangeInput(parseInt(event.target.value), false);
          }}
          size="small"
        />
      </Box>
    </Box>
  );
}

export default RangeSlider;
