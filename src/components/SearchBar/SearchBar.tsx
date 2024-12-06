import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/system";

interface Prop {
  placeholder?: string;
  onSearch: (value: string) => void;
}

export default function SearchBar({ placeholder, onSearch }: Prop) {
  const theme = useTheme();
  return (
    <Paper
      component="form"
      sx={{ display: "flex", alignItems: "center", width: 300 }}
    >
      <InputBase
        sx={{ ml: 1, width: theme.spacing(30) }}
        placeholder={placeholder ?? "Pesquisa"}
        inputProps={{ "aria-label": "pesquisa" }}
        onChange={(e) => {
          onSearch(e.target.value);
        }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
