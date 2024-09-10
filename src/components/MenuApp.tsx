"use client";

import { useRouter } from "next/navigation";
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import TypeMenuNav from "@/types/TypeMenuNav";
import Colors from "@/Variables/Colors";


interface Prop {
  navOptions: TypeMenuNav[];
}

function MenuApp(props: Prop) {
  const [choiceMenu, setChoiceMenu] = useState(0);

  const router = useRouter();

  useEffect(() => {
    onChangeValue(null, choiceMenu);
  }, []);

  const onChangeValue = (
    event: SyntheticEvent<Element, Event> | null,
    value: any
  ) => {
    setChoiceMenu(value);
    router.push(props.navOptions[value].path);
  };

  return (
    <AppBar position="static">
      <Box
        width={"100vw"}
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
        pl={2}
        pr={2}
      >
        <Box
          width={"auto"}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"20px"}
        >
          <Typography variant="h4" color={Colors.orange}>
            BRLink
          </Typography>
          <Typography variant="subtitle2">
            os melhores links dos melhores produtos
          </Typography>
        </Box>
        <Box>
          <BottomNavigation
            showLabels
            value={choiceMenu}
            onChange={onChangeValue}
            sx={{ backgroundColor: "transparent" }}
          >
            {props.navOptions.map((option, index) => (
              <BottomNavigationAction
                key={index}
                label={option.label}
                icon={<option.icon />}
              />
            ))}
          </BottomNavigation>
        </Box>
      </Box>
    </AppBar>
  );
}

export default MenuApp;
