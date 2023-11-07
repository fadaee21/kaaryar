import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { StyledTableCell, StyledTableRow } from "../../../styles/table";
import { EnglishShort } from "../../../model";
import { persianDate } from "../../../utils/persianDate";
interface Prop {
  englishCourse: EnglishShort;
  counter: number;
}
const TableBodyLanguage = ({ englishCourse, counter }: Prop) => {
  const {
    id,
    name,
    startDate,
    endDate,
    studentCount,
    category,
    teachingStatus,
    nonLmsInstructors,
  } = englishCourse;
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
        <Typography variant="body2">{teachingStatus}</Typography>
      </StyledTableCell>
     <StyledTableCell align="center" >
        <Typography variant="body2">
          {category ? category.groupCode + "-" + category.name : "-"}
        </Typography>
      </StyledTableCell>
     <StyledTableCell align="center" >
        <Typography variant="body2">{nonLmsInstructors || "-"}</Typography>
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

export default TableBodyLanguage;
