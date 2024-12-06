import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import TSelectOption from "@/types/TSelectOption";
import useMultiSelect from "./Hooks/useMultiSelect";

const ITEM_HEIGHT = 20;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.8 + ITEM_PADDING_TOP,
      width: 25,
    },
  },
};

interface Prop {
  label: string;
  /**
   * is important pass a select option for all selects tha value is 0
   */
  selectOptions: TSelectOption[];
  onChange: (values: string[]) => void;
}

export default function MultipleSelect(props: Prop) {
  const { handleChange, targets } = useMultiSelect({
    options: props.selectOptions.map((opt) => opt.value),
    onChange: props.onChange,
  });

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id={`checkbox-label${props.label}`}>
          {props.label}
        </InputLabel>
        <Select
          size="small"
          labelId={`checkbox-label${props.label}`}
          id={`checkbox-label-select-${props.label}`}
          multiple
          value={targets}
          onChange={handleChange}
          input={<OutlinedInput label={props.label} />}
          renderValue={(selected) =>
            `${selected.includes("0") ? selected.length - 1 : selected.length} ${props.label}${
              selected.length > 1 ? "s " : " "
            } selecionada(s)`
          }
          // MenuProps={MenuProps}
        >
          {props.selectOptions.map((opt) => (
            <MenuItem key={opt.label} value={opt.value}>
              <Checkbox checked={targets.includes(opt.value)} />
              <ListItemText primary={opt.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
