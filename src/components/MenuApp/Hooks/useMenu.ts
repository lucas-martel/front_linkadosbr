import TMenuNav from "@/types/TMenuNav";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

const useMenu = (navOpts: TMenuNav[]) => {
  const [choiceMenu, setChoiceMenu] = useState(0);

  const router = useRouter();

  const onChangeValue = (
    event: SyntheticEvent<Element, Event> | null,
    value: any
  ) => {
    setChoiceMenu(value);
    router.push(navOpts[value].path);
  };

  return {
    choiceMenu,
    onChangeValue,
  };
};

export default useMenu;
