import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { StyledTableCell, StyledTableRow } from "../../../styles/table";
import { ShortCoreModule } from "../../../model";
import { persianDate } from "../../../utils/persianDate";
import { convertArrToStr } from "../../../utils/courseMethod";

interface Prop {
  moduleAll: ShortCoreModule;
  counter: number;
}

const TableBodyCoreModuleCourse = ({ moduleAll, counter }: Prop) => {
  const {
    id,
    name,
    careerPathway,
    category,
    teachingStatus,
    instructors,
    startDate,
    endDate,
    studentCount,
    mentorCount,
    teachingAssistantCount,
    weblinkFinalProject,
  } = moduleAll;
  return (
    <StyledTableRow
      // onClick={() => {
      //   navigate(`/admin/core-course/${id}`);
      // }}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        // cursor: "pointer",
      }}
    >
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{counter + 1}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">
          <Link to={`${id}`}>{name}</Link>
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">
          {careerPathway ? careerPathway.name : "-"}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">
          {category ? category.groupCode + "-" + category.name : "-"}
        </Typography>
      </StyledTableCell>

      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{teachingStatus || "-"}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">
          {instructors.length > 0 ? convertArrToStr(instructors) : "-"}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{persianDate(startDate)}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{persianDate(endDate)}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{studentCount}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{teachingAssistantCount}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{mentorCount}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{weblinkFinalProject ?? "-"}</Typography>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default TableBodyCoreModuleCourse;
