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
import {
  englishStudent,
  interpersonalStudent,
  vocationalStudent,
  workshopsStudent,
} from "../table/helper-header";
import { convertArrToStr } from "../../utils/courseMethod";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

interface Prop {
  courses: ModulesAsStudent[] | undefined;
}

const GeneralCourseStudent = ({ courses }: Prop) => {
  const { adminVisibility } = useAuth();

  const workshopCourses = courses?.filter(
    (item) => item.module.subType === "workshop"
  );
  const englishCourses = courses?.filter(
    (item) => item.module.subType === "english_module"
  );
  const vocationalCourses = courses?.filter(
    (item) => item.module.subType === "vocational_skills"
  );
  const interpersonalCourses = courses?.filter(
    (item) => item.module.subType === "interpersonal_skills"
  );

  if (
    [
      workshopCourses,
      englishCourses,
      vocationalCourses,
      interpersonalCourses,
    ].every((arr) => arr?.length === 0)
  ) {
    return <p>هیچ دوره عمومی برای این مهارت آموز وجود ندارد</p>;
  }

  return (
    <>
      {workshopCourses && workshopCourses.length > 0 && (
        <>
          <Typography sx={{ mt: 4, mb: 1 }}>کارگاه جانبی</Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHeader
                headerItems={
                  adminVisibility
                    ? workshopsStudent
                    : workshopsStudent.slice(0, -1) //remove editing column for whose are not admin
                }
              />
              <TableBody>
                {workshopCourses.map((course) => (
                  <RowTableWorkShop key={course.module.id} {...course} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {englishCourses && englishCourses.length > 0 && (
        <>
          <Typography sx={{ mt: 4, mb: 2 }}>زبان انگلیسی</Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHeader
                headerItems={
                  adminVisibility ? englishStudent : englishStudent.slice(0, -1) //remove editing column for whose are not admin
                }
              />
              <TableBody>
                {englishCourses.map((course) => (
                  <RowTableEnglish key={course.module.id} {...course} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {vocationalCourses && vocationalCourses.length > 0 && (
        <>
          <Typography sx={{ mt: 4, mb: 2 }}>مهارت‌های حرفه‌ای</Typography>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHeader
                headerItems={
                  adminVisibility
                    ? vocationalStudent
                    : vocationalStudent.slice(0, -1) //remove editing column for whose are not admin
                }
              />
              <TableBody>
                {vocationalCourses.map((course) => (
                  <RowTableVocational key={course.module.id} {...course} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {interpersonalCourses && interpersonalCourses.length > 0 && (
        <>
          <Typography sx={{ mt: 4, mb: 2 }}>مهارت‌های ارتباطی</Typography>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHeader
                headerItems={
                  adminVisibility
                    ? interpersonalStudent
                    : interpersonalStudent.slice(0, -1) //remove editing column for whose are not admin
                }
              />
              <TableBody>
                {interpersonalCourses.map((course) => (
                  <RowTableInterpersonal key={course.module.id} {...course} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};

export default GeneralCourseStudent;

const RowTableWorkShop = ({ module, assessment }: ModulesAsStudent) => {
  const { name, instructors, startDate, id } = module;
  const { attendanceGrade } = assessment;
  const navigate = useNavigate();
  const { adminVisibility } = useAuth();

  return (
    <StyledTableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
     <StyledTableCell align="center" >
        <Typography variant="body2">{name}</Typography>
      </StyledTableCell>

     <StyledTableCell align="center" >
        <Typography variant="body2">
          {instructors ? convertArrToStr(instructors) : "-"}
        </Typography>
      </StyledTableCell>

     <StyledTableCell align="center" >
        <Typography variant="body2">{persianDate(startDate)}</Typography>
      </StyledTableCell>

     <StyledTableCell align="center" >
        <Typography variant="body2">{attendanceGrade ?? "-"}</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          verticalAlign: "center",
          cursor: "pointer",
          ...(!adminVisibility && { display: "none" }),
        }}
        onClick={() => navigate(`${id}/general-edit`)}
      >
        <EditIcon />
      </StyledTableCell>
    </StyledTableRow>
  );
};
const RowTableEnglish = ({ module, assessment }: ModulesAsStudent) => {
  const { name, instructors, startDate, teachingStatus, id } = module;
  const { attendanceGrade, nextModule, finalGrade, finalAssessment } =
    assessment;
  const navigate = useNavigate();
  const { adminVisibility } = useAuth();

  return (
    <StyledTableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
     <StyledTableCell align="center" >
        <Typography variant="body2">{name}</Typography>
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
      <StyledTableCell align="center">
        <Typography variant="body2">{attendanceGrade ?? "-"}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="body2">
          {nextModule ? nextModule.name : "-"}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="body2">{finalGrade ? finalGrade : "-"}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        {finalAssessment ? finalAssessment.value : "-"}
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          verticalAlign: "center",
          cursor: "pointer",
          ...(!adminVisibility && { display: "none" }),
        }}
        onClick={() => navigate(`${id}/general-edit`)}
      >
        <EditIcon />
      </StyledTableCell>
    </StyledTableRow>
  );
};
const RowTableVocational = ({ module, assessment }: ModulesAsStudent) => {
  const { name, instructors, startDate, teachingStatus, category, id } = module;
  const { attendanceGrade } = assessment;
  const navigate = useNavigate();
  const { adminVisibility } = useAuth();

  return (
    <StyledTableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
     <StyledTableCell align="center" >
        <Typography variant="body2">{name}</Typography>
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

      <StyledTableCell align="center">{attendanceGrade ?? "-"}</StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          verticalAlign: "center",
          cursor: "pointer",
          ...(!adminVisibility && { display: "none" }),
        }}
        onClick={() => navigate(`${id}/general-edit`)}
      >
        <EditIcon />
      </StyledTableCell>
    </StyledTableRow>
  );
};
const RowTableInterpersonal = ({ module, assessment }: ModulesAsStudent) => {
  const {
    name,
    instructors,
    startDate,
    endDate,
    teachingStatus,
    category,
    id,
  } = module;
  const { attendanceGrade, homeworkAssessment, finalAssessment } = assessment;
  const navigate = useNavigate();
  const { adminVisibility } = useAuth();
  return (
    <StyledTableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
     <StyledTableCell align="center" >
        <Typography variant="body2">{name}</Typography>
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
     <StyledTableCell align="center" >
        <Typography variant="body2">{persianDate(endDate)}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="body2">{attendanceGrade ?? "-"}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="body2">
          {homeworkAssessment ? homeworkAssessment.value : "-"}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="body2">
          {finalAssessment ? finalAssessment.value : "-"}
        </Typography>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          verticalAlign: "center",
          cursor: "pointer",
          ...(!adminVisibility && { display: "none" }),
        }}
        onClick={() => navigate(`${id}/general-edit`)}
      >
        <EditIcon />
      </StyledTableCell>
    </StyledTableRow>
  );
};
