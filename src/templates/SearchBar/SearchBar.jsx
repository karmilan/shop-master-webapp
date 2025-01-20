import { Close, Search } from "@mui/icons-material";
import { IconButton, InputBase, Paper } from "@mui/material";
// import { Search, X } from "lucide-react";
import React from "react";

function SearchBar({ value, onChange, placeholder, clear }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      // sx={{
      //   display: "flex",
      //   alignItems: "center",
      //   width: "100%",
      //   maxWidth: "600px",
      //   mx: "auto",
      //   borderRadius: "24px",
      //   bgcolor: "#ffffff75",
      // }}
      sx={{
        display: "flex",
        alignItems: "center",
        width: { xs: "100%", sm: "30%" },
        maxWidth: "600px",
        mr: "auto",
        borderRadius: "24px",
        bgcolor: "#f9f9f9",
        // border: "solid 1px white",
      }}
      elevation={3}
    >
      <IconButton sx={{ p: "10px" }} aria-label="search">
        <Search sx={{ color: "#333333" }} size={20} />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1, color: "#333333" }}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {value && (
        <IconButton sx={{ p: "10px" }} aria-label="clear" onClick={clear}>
          <Close sx={{ color: "#333333" }} size={20} />
        </IconButton>
      )}
    </Paper>
  );
}

export default SearchBar;
