import TSelectOption from "@/types/TSelectOption";
import { SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";

interface Prop {
  /**
   * options selected on init component
   */
  initTargets: string[];
  allOptions: string[];
  onChange: (value: string[]) => void;
}

const useMultiSelect = (prop: Prop) => {
  const [targets, setTargets] = useState<string[]>(["0", ...prop.initTargets]);

  const handleChange = (event: SelectChangeEvent<typeof targets>) => {
    const {
      target: { value },
    } = event;

    const values = typeof value === "string" ? value.split(",") : value;

    let valuesToOnChange: string[] = [];

    if (values.indexOf("0") !== -1) {
      if (targets.indexOf("0") === -1) {
        //marcou todos os items
        valuesToOnChange = prop.allOptions;
        setTargets(["0", ...prop.allOptions]);
      } else {
        //removeu um item quando todos estavam marcados
        valuesToOnChange = values.filter((v) => v !== "0");
        setTargets(valuesToOnChange);
      }
    } else {
      if (targets.indexOf("0") !== -1) {
        setTargets([]);
      } else if (values.length === prop.allOptions.length) {
        // marcou todos os items porem o todos nao esta marcado
        valuesToOnChange = prop.allOptions;
        setTargets(["0", ...prop.allOptions]);
      } else {
        valuesToOnChange = values;
        setTargets(values);
      }
    }
    prop.onChange(valuesToOnChange);
  };

  // useEffect(() => {
  //   prop.onChange(targets.filter((t) => t !== "0"));
  // }, [targets]);

  useEffect(() => {
    setTargets(["0", ...prop.allOptions]);
  }, [prop.allOptions]);

  return {
    targets,
    handleChange,
  };
};

export default useMultiSelect;
