"use client";
import { Box, FormControl, InputLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import TypeSelectOption from "@/types/TypeSelectOption";

interface Prop {
  selectLabel: string;
  items: TypeSelectOption[];
  resetOnAlterItems: boolean;
  onChange: (value: string) => void;
}

function SelectOption(props: Prop) {
  const [options, setOptions] = useState("");

  useEffect(() => {
    if (props.resetOnAlterItems) {
      setOptions(props.items[0].value);
    }
  }, [props.items]);

  const handleChange = (event: SelectChangeEvent) => {
    setOptions(event.target.value as string);
    props.onChange(event.target.value as string);
  };

  return (
    <FormControl variant="standard" fullWidth>
      <InputLabel id="product">{props.selectLabel}</InputLabel>
      <Select label={props.selectLabel} value={options} onChange={handleChange}>
        {props.items.map((item, key) => (
          <MenuItem key={key} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectOption;
