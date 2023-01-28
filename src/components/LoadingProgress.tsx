import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface Usage {
  usage?: "page" | "paper";
}

const LoadingProgress = ({ usage }: Usage) => {
  return (
    <>
      {usage === "paper" ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      ) : (
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
      )}
    </>
  );
};

export default LoadingProgress;
