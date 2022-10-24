import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import iran from "../assets/iranFlag.jpg";
export const Dashboard = () => {
  return (
    <>
      <Typography variant="h3">داشبورد</Typography>
      <Box sx={{ display: "grid", placeItems: "center" }}>
        <Box
          sx={{
            background: `${iran} no-repeat center center/contained`,
            width: "60vw",
            m:5
          }}
          component="img"
          src={iran}
          alt="iran's flag"
        />
      </Box>
    </>
  );
};
