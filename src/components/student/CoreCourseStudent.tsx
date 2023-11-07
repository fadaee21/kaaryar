import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import { ModulesAsStudent } from "../../model";
import { StyledTableCell, StyledTableRow } from "../../styles/table";
import TableHeader from "../table/TableHeader";
import { persianDate } from "../../utils/persianDate";
import { coreStudent } from "../table/helper-header";
import { convertArrToStr } from "../../utils/courseMethod";
import { useNavigate } from "react-router-dom";
import usePersonnelAssignmentName from "../../hooks/usePersonnelAssignmentName";

interface Prop {
  courses: ModulesAsStudent[] | undefined;
}
const CoreCourseStudent = ({ courses }: Prop) => {
  if (!courses?.length) {
    return <p>هیچ دوره تخصصی برای این مهارت آموز وجود ندارد</p>;
  }
  return (
    <TableContainer component={Paper} sx={{ mt: 8 }}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHeader headerItems={coreStudent} />
        <TableBody>
          {courses?.map((course) => (
            <RowTable key={course.module.id} {...course} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CoreCourseStudent;

const RowTable = ({
  module,
  assessment,
  personnelAssignment,
}: ModulesAsStudent) => {
  const navigate = useNavigate();
  const {
    name,
    careerPathway,
    instructors,
    category,
    startDate,
    // endDate,
    teachingStatus,
    id,
  } = module;
  const { finalAssessment, finalGrade } = assessment;

  // function personnelAssignmentName(role: "ta" | "mentor"): string {
  //   const assignedPersonnel = personnelAssignment.find(
  //     (i) => i.personnelRole === role
  //   );
  //   if (assignedPersonnel) {
  //     const { firstName, family } = assignedPersonnel.personnel;
  //     return `${firstName} ${family}`;
  //   }
  //   return "-";
  // }

  const personnelAssignmentName = usePersonnelAssignmentName();

  return (
    <StyledTableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        cursor: "pointer",
      }}
      onClick={() => navigate(`${id}/core-detail`)}
    >
     <StyledTableCell align="center" >
        <Typography variant="body2">{name}</Typography>
      </StyledTableCell>
     <StyledTableCell align="center" >
        <Typography variant="body2">
          {careerPathway ? careerPathway.name : "-"}
        </Typography>
      </StyledTableCell>
     <StyledTableCell align="center" >
        <Typography variant="body2">
          {category ? category.name : "-"}
        </Typography>
      </StyledTableCell>
     <StyledTableCell align="center" >
        <Typography variant="body2">{teachingStatus ?? "-"}</Typography>
      </StyledTableCell>
     <StyledTableCell align="center" >
        <Typography variant="body2">
          {instructors ? convertArrToStr(instructors) : "-"}
        </Typography>
      </StyledTableCell>
     <StyledTableCell align="center" >
        <Typography variant="body2">{persianDate(startDate)}</Typography>
      </StyledTableCell>
      {/*<StyledTableCell align="center" >
        <Typography variant="body2">
          {endDate ? persianDate(endDate) : "-"}
        </Typography>
      </StyledTableCell> */}
     <StyledTableCell align="center" >
        <Typography variant="body2">
          {personnelAssignmentName("ta", personnelAssignment)}
        </Typography>
      </StyledTableCell>
     <StyledTableCell align="center" >
        <Typography variant="body2">
          {personnelAssignmentName("mentor", personnelAssignment)}
        </Typography>
      </StyledTableCell>
     <StyledTableCell align="center" >
        <Typography variant="body2">{finalGrade ? finalGrade : "-"}</Typography>
      </StyledTableCell>
     <StyledTableCell align="center" >
        <Typography variant="body2">
          {finalAssessment ? finalAssessment.value : "-"}
        </Typography>
      </StyledTableCell>
    </StyledTableRow>
  );
};
