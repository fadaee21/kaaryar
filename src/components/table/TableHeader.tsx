import { TableHead } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../../styles/table";

const TableHeader = () => {
  return (
    <TableHead>
      <StyledTableRow>
        <StyledTableCell align="left">نام و نام خانوادگی</StyledTableCell>
        <StyledTableCell align="center">سال تولد</StyledTableCell>
        <StyledTableCell align="center">کد متقاضی</StyledTableCell>
        <StyledTableCell align="center">کد ملی</StyledTableCell>
        <StyledTableCell align="center">موبایل</StyledTableCell>
        <StyledTableCell align="center">ایمیل</StyledTableCell>
      </StyledTableRow>
    </TableHead>
  );
};

export default TableHeader;
