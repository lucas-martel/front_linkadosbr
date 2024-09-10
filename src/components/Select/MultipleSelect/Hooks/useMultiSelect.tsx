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
  const [visibleOptions, setVisibleOptions] = useState<string[]>(prop.options);

  const handleChange = (event: SelectChangeEvent<typeof visibleOptions>) => {
    const {
      target: { value },
    } = event;

    const options: string[] =
      typeof value === "string" ? value.split(",") : value;
    controllSelects(options);
  };

  const controllSelects = (options: string[]) => {
    if (options.includes("0")) { //OPÇÃO TODO ESTÁ MARCADA
      if (!visibleOptions.includes("0")) { //MARCOU TODOS OS ITENS
        setVisibleOptions(prop.options);
      } else { //REMOVEU UM ITEM QUADO TODOS ESTAVAM MARCADOS
        setVisibleOptions(options.filter((v) => v !== "0"));
      }
    } else { //OPÇÃO TODO NÃO ESTÁ MARCADA
      if (visibleOptions.includes("0")) { //TODOS FOI REMOVIDO DA OPCAO DO USUÁRIO, E TODOS AS OPÇÕES DEVEM SER DESMARCADAS  
        setVisibleOptions([]);
      } else if ((options.length + 1) === prop.options.length) { // TODOS OS ITEMS DEVEM ESTÁ MARCADOS
        setVisibleOptions(prop.options);
      } else {
        setVisibleOptions(options);
      }
    }
  };

  useEffect(() => {
    prop.onChange(visibleOptions);
  }, [visibleOptions]);

  return {
    targets: visibleOptions,
    handleChange,
  };
};

export default useMultiSelect;
