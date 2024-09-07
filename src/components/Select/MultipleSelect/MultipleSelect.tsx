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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Prop {
  label: string;
  selectOptions: TSelectOption[];
  initOptionsSelecteds: TSelectOption[];
  onChange: (values: string[]) => void;
}

export default function MultipleSelect(props: Prop) {
  const { handleChange, targets } = useMultiSelect({
    allOptions: props.selectOptions.map((opt) => opt.value),
    initTargets: props.initOptionsSelecteds.map((opt) => opt.value),
    onChange: props.onChange,
  });

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id={`checkbox-label${props.label}`}>{props.label}</InputLabel>
        <Select
          labelId={`checkbox-label${props.label}`}
          id={`checkbox-label-select-${props.label}`}
          multiple
          value={targets}
          onChange={handleChange}
          input={<OutlinedInput label={props.label} />}
          renderValue={(selected) => "selecionados"}
          MenuProps={MenuProps}
        >
          <MenuItem key={"tudo"} value={"0"}>
            <Checkbox checked={targets.indexOf("0") !== -1} />
            <ListItemText primary={"tudo"} />
          </MenuItem>
          {props.selectOptions.map((opt) => (
            <MenuItem key={opt.label} value={opt.value}>
              <Checkbox checked={targets.indexOf(opt.value) > -1} />
              <ListItemText primary={opt.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
