import { Typography } from "@mui/material";
import React from "react";

const TableEmpty = () => {
  return (
    <Typography variant="body2" textAlign={"center"} sx={{border:"1px solid #aaa",pt:3,pb:10}}>
      نتیجه ای برای این جستجو یافت نشد
    </Typography>
  );
};

export default TableEmpty;
    