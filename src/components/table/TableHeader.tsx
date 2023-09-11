import { TableHead } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../../styles/table";
import { TableHeaderProps, TableHeaderStudentProps } from "../../model";

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
      <StyledTableRow>
        {studentHeaderItems.map((item) => (
          <StyledTableCell
            align={item.align}
            key={item.id}
            sx={{ minWidth: item.minWidth }}
          >
            {item.label}
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
};
