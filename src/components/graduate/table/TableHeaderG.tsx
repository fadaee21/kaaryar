import { TableHead } from "@mui/material";
import React from "react";
import { StyledTableCell, StyledTableRow } from "../../../styles/table";

const TableHeaderG = () => {
  return (
    <TableHead>
      <StyledTableRow>
        <StyledTableCell />
        <StyledTableCell align="left">نام و نام خانوادگی</StyledTableCell>
        <StyledTableCell align="left">کد مهارت آموز</StyledTableCell>
        <StyledTableCell align="left">مسیر آموزشی</StyledTableCell>
        <StyledTableCell align="left">
          وضعیت اشتغال در زمان فارغ التحصیلی
        </StyledTableCell>
        <StyledTableCell align="left">وضعیت اشتغال پذیری</StyledTableCell>
        <StyledTableCell align="left">موقعیت شغلی پیشنهادی</StyledTableCell>
        <StyledTableCell align="left">نام کارفرما</StyledTableCell>
        <StyledTableCell align="left">آخرین وضعیت</StyledTableCell>
        <StyledTableCell align="left">تاریخ شروع به کار</StyledTableCell>
        <StyledTableCell align="left">عملیات</StyledTableCell>
      </StyledTableRow>
    </TableHead>
  );
};

export default TableHeaderG;
