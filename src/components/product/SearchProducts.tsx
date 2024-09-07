import { InputBase, Paper } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

const SearchProducts = () => {
  return (
    <Paper
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      component={"form"}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Pesquisar"
        inputProps={{ "aria-label": "Pequisar" }}
        value={""}
      />
      <IconButton>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchProducts;
