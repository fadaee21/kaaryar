import { TableHead } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../../styles/table";
import { TableHeaderProps, TableHeaderStudentProps } from "../../model";
import {
  StyledTableCellAdmin,
  StyledTableRowAdmin,
} from "../../styles/adminTable";

const TableHeader = ({ headerItems }: TableHeaderProps) => {
  return (
    <TableHead>
      <StyledTableRow>
        {headerItems.map((item, i) => (
          <StyledTableCell align="center" key={i}>
            {item}
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
};

export default TableHeader;
export const TableHeaderStudent = ({
  studentHeaderItems,
}: TableHeaderStudentProps) => {
  return (
    <TableHead>
      <StyledTableRowAdmin>
        {studentHeaderItems.map((item) => (
          <StyledTableCellAdmin
            align={item.align}
            key={item.id}
            sx={{ minWidth: "max-content", whiteSpace: "nowrap" }}
          >
            {item.label}
          </StyledTableCellAdmin>
        ))}
      </StyledTableRowAdmin>
    </TableHead>
  );
};
