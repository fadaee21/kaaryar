import { TableHead } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../../styles/table";
import { TableHeaderProps } from "../../model";

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
