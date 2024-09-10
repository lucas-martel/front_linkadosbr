import { Box, Slider } from "@mui/material";
import React from "react";

function RangeSlider() {
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => "preço"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={(value, index) => index === 0 ? "min" : "max"}
      />
    </Box>
  );
}

export default RangeSlider;
