"use client";

import { useRouter } from "next/navigation";
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Stack,
  SxProps,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
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
import TypeMenuNav from "@/types/TMenuNav";
import Colors from "@/Variables/Colors";
import useMenu from "./Hooks/useMenu";

interface Prop {
  navOptions: TypeMenuNav[];
}

const menuContainerStyle: SxProps = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 0.5em",
};

const titleStyle: SxProps = {
  maxWidth: "60%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.1em",
  flexDirection: "row"
};

function MenuApp(props: Prop) {
  const { choiceMenu, onChangeValue } = useMenu(props.navOptions);
  const theme = useTheme();

  const isLargerThanMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <AppBar position="static">
      <Box sx={menuContainerStyle}>
        <Box sx={titleStyle}>
          <Typography variant="h4" color={Colors.orange}>
            Linkados BR
          </Typography>
          {isLargerThanMd && (
            <Typography variant="subtitle2">
              os melhores links dos melhores produtos
            </Typography>
          )}
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
