import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
//write a regexp that don't allow to use any special character
//write a function to validate website url

const regexp = /[^a-zA-Z0-9]/;

const JustTest = () => {
  const [inputState, setInputState] = useState("");
  const [error, setError] = useState(false);

  const validation = (value?: string) =>
    value && regexp.test(value) ? true : false;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (validation(value)) setError(true);
    setInputState(value);
    setError(false);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (validation(value)) setError(true);
    console.log("value");
  };

  return (
    <Box sx={{ width: "50%", m: "auto" }}>
      <TextField
        fullWidth
        error={error}
        helperText={error ? "it's not valid" : " "}
        id="outlined-error-helper-text"
        label="Error"
        onChange={handleChange}
        onBlur={handleBlur}
        // type="email"

        value={inputState}
      />
      {/* <Button onClick={handleSubmit}>SUBMIT</Button> */}
    </Box>
  );
};

export default JustTest;
