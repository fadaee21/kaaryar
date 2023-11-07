import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { StyledTableCell, StyledTableRow } from "../../../styles/table";
import { WorkshopShort } from "../../../model";
import { persianDate } from "../../../utils/persianDate";
import { convertArrToStr } from "../../../utils/courseMethod";
interface Prop {
  vocational: WorkshopShort;
  counter: number;
}
const TableBodyVocational = ({ vocational, counter }: Prop) => {
  const {
    id,
    name,
    startDate,
    endDate,
    studentCount,
    category,
    // isActive,
    teachingStatus,
    instructors,
  } = vocational;
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
      {/*<StyledTableCell align="center" >
        <Typography variant="body2">{levelName}</Typography>
      </StyledTableCell> */}
     <StyledTableCell align="center" >
        <Typography variant="body2">
          {category ? category.groupCode + "-" + category.name : "-"}
        </Typography>
      </StyledTableCell>
     <StyledTableCell align="center" >
        <Typography variant="body2">
          {/* {isActive ? "در حال آموزش" : "تمام‌شده"} */}
          {teachingStatus}
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
        <Typography variant="body2">{persianDate(endDate)}</Typography>
      </StyledTableCell>
     <StyledTableCell align="center" >
        <Typography variant="body2">{studentCount}</Typography>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default TableBodyVocational;
