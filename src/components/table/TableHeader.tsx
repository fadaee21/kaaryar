import { TableHead } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../../styles/table";
import { useLocation } from "react-router-dom";

const TableHeader = () => {
  const { pathname } = useLocation();
  return (
    <TableHead>
      <StyledTableRow>
        {pathname.endsWith("register-form") && <StyledTableCell />}
        <StyledTableCell align="center">وضعیت</StyledTableCell>
        <StyledTableCell align="left">نام و نام خانوادگی</StyledTableCell>
        <StyledTableCell align="center">سال تولد</StyledTableCell>
        <StyledTableCell align="center">جنسیت</StyledTableCell>
        <StyledTableCell align="center">کد متقاضی</StyledTableCell>
        <StyledTableCell align="center">کد ملی</StyledTableCell>
        <StyledTableCell align="center">موبایل</StyledTableCell>
        <StyledTableCell align="center">ایمیل</StyledTableCell>
      </StyledTableRow>
    </TableHead>
  );
};

export default TableHeader;
