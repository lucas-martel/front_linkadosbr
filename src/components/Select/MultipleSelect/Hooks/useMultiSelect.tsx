import TSelectOption from "@/types/TSelectOption";
import { SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";

interface Prop {
  /**
   * options selected on init component
   */
  options: string[];
  onChange: (value: string[]) => void;
}

const useMultiSelect = (prop: Prop) => {
  const [targets, setTargets] = useState<string[]>(prop.options);

  const handleChange = (event: SelectChangeEvent<typeof targets>) => {
    const {
      target: { value },
    } = event;

    const values: string[] =
      typeof value === "string" ? value.split(",") : value;
    controllSelects(values);
    // if (values.indexOf("0") !== -1) {
    //   if (targets.indexOf("0") === -1) {
    //     //marcou todos os items
    //     setTargets(prop.options);
    //   } else {
    //     //removeu um item quando todos estavam marcados
    //     setTargets(values.filter((v) => v !== "0"));
    //   }
    // } else {
    //   if (targets.indexOf("0") !== -1) {
    //     setTargets([]);
    //   } else if (values.length === prop.options.length) {
    //     // marcou todos os items porem o todos nao esta marcado
    //     setTargets(prop.options);
    //   } else {
    //     setTargets(values);
    //   }
    // }
  };

  const controllSelects = (values: string[]) => {
    if (values.indexOf("0") !== -1) {
      if (targets.indexOf("0") === -1) {
        //marcou todos os items
        setTargets(prop.options);
      } else {
        //removeu um item quando todos estavam marcados
        setTargets(values.filter((v) => v !== "0"));
      }
    } else {
      if (targets.indexOf("0") !== -1) {
        setTargets([]);
      } else if (values.length === prop.options.length) {
        // marcou todos os items porem o todos nao esta marcado
        setTargets(prop.options);
      } else {
        setTargets(values);
      }
    }
  };

  useEffect(() => {
    prop.onChange(targets);
  }, [targets]);

  return {
    targets,
    handleChange,
  };
};

export default useMultiSelect;
