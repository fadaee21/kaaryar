import { Typography } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../../../styles/table";
import { WorkshopShort } from "../../../model";
import { persianDate } from "../../../utils/persianDate";
import { convertArrToStr } from "../../../utils/courseMethod";
import { Link } from "react-router-dom";
interface Prop {
  workshops: WorkshopShort;
  counter: number;
}
const TableBodyWorksShops = ({ workshops, counter }: Prop) => {
  const { id, name, startDate, studentCount, instructors } = workshops;
  return (
    <StyledTableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
     <StyledTableCell align="center" >
        <Typography variant="body2">{counter + 1}</Typography>
      </StyledTableCell>

     <StyledTableCell align="center" >
        <Typography variant="body2">
          <Link to={`${id}`}>{name}</Link>
        </Typography>
      </StyledTableCell>
     <StyledTableCell align="center" >
        <Typography variant="body2">
          {instructors.length ? convertArrToStr(instructors) : "-"}
        </Typography>
      </StyledTableCell>
     <StyledTableCell align="center" >
        <Typography variant="body2">{persianDate(startDate)}</Typography>
      </StyledTableCell>
     <StyledTableCell align="center" >
        <Typography variant="body2">{studentCount}</Typography>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default TableBodyWorksShops;
