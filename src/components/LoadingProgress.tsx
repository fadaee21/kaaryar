import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const LoadingProgress = () => {
  return (
    <Box
    component={"div"}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress color="secondary" size={72} />
    </Box>
  );
};

export default LoadingProgress;
