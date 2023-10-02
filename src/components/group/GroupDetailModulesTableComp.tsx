import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import { ModuleGroup } from "../../model";
import { StyledTableCell, StyledTableRow } from "../../styles/table";
import { convertArrToStr } from "../../utils/courseMethod";
import { persianDate } from "../../utils/persianDate";
import { trainingCourseHeaderModule } from "../table/helper-header";
import TableHeader from "../table/TableHeader";
import { useNavigate } from "react-router-dom";

interface Props {
  modules: ModuleGroup[] | undefined;
}
const GroupDetailModulesTableComp = ({ modules }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHeader headerItems={trainingCourseHeaderModule} />
        <TableBody>
          {modules?.map((moduleAll, inx) => (
            <RowTable
              //   color={moduleAll.moduleType === "general" ? "#ccc" : ""}
              moduleType={moduleAll.moduleType}
              counter={inx}
              name={moduleAll.name}
              careerPathway={moduleAll.careerPathway}
              category={moduleAll.category}
              teachingStatus={moduleAll.teachingStatus}
              instructors={moduleAll.instructors}
              startDate={moduleAll.startDate}
              endDate={moduleAll.endDate}
              studentCount={moduleAll.studentCount}
              mentorCount={moduleAll.mentorCount}
              teachingAssistantCount={moduleAll.teachingAssistantCount}
              weblinkFinalProject={moduleAll.weblinkFinalProject}
              id={moduleAll.id}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GroupDetailModulesTableComp;

const RowTable = ({
  //   color,
  counter,
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
  moduleType,
  id,
}: any) => {
  const navigate = useNavigate();
  return (
    <StyledTableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        // backgroundColor: `${color} !important`,
        cursor: "pointer",
      }}
      onClick={() =>
        navigate(
          `/admin/${
            moduleType === "core" ? "core-course" : "general-course"
          }/${id}`
        )
      }
    >
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{counter + 1}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">
          {moduleType === "general" ? "عمومی" : "تخصصی"}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{name}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">
          {careerPathway ? careerPathway.name : "-"}
        </Typography>
      </StyledTableCell>
      {/* <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">
          {category ? category.groupCode + "-" + category.name : "-"}
        </Typography>
      </StyledTableCell> */}

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
      {/* <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{persianDate(endDate)}</Typography>
      </StyledTableCell> */}
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{studentCount}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{teachingAssistantCount}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{mentorCount}</Typography>
      </StyledTableCell>
      {/* <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{weblinkFinalProject ?? "-"}</Typography>
      </StyledTableCell> */}
    </StyledTableRow>
  );
};
