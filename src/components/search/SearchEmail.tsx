import { TextField } from "@mui/material";
import React from "react";

const SearchEmail = ({ setEmailState }: any) => {
  return (
    <TextField
      id="outlined-email"
      label="ایمیل"
      variant="outlined"
      onChange={(e) => setEmailState(e.target.value)}
      type="email"
    />
  );
};

export default SearchEmail;
