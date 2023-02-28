import { TableHead } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../../../styles/table";

const TableHeader = () => {
  return (
    <TableHead>
      <StyledTableRow>
        <StyledTableCell />
        <StyledTableCell align="center">نام داوطلب</StyledTableCell>
        <StyledTableCell align="center">نقش</StyledTableCell>
        <StyledTableCell align="center">عملیات</StyledTableCell>
      </StyledTableRow>
    </TableHead>
  );
};

export default TableHeader;
