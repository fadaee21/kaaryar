import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { Navigate, Link } from "react-router-dom";
import { ExcelExport } from "../../components/ExcelExport";
import LoadingProgress from "../../components/LoadingProgress";
import { useAuth } from "../../context/AuthProvider";
import { StyledTableCell, StyledTableRow } from "../../styles/table";
import { AccordionStyled } from "../../styles/search/accordion";
import useSWR from "swr";
import TableHeader from "../../components/table/TableHeader";
import { assigneeStudentTableHeader } from "../../components/table/helper-header";
import TablePic from "../../components/table/TablePic";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";
import { AssigneeStudentsAll } from "./studentMentorTaType";
//^this component list related student for mentor and ta
const StudentTableAssignee = () => {
  const {
    auth: { username: user_name, roles },
  } = useAuth();
  const role = roles.toString();
  const { data, isLoading, error } = useSWR<AssigneeStudentsAll>(
    `/user/profile/username/${user_name}/students`
  );
  const STUDENT_MODULE_PATH = `/${role}/core-course`;
  if (isLoading) {
    return <LoadingProgress />;
  }

  if (error) {
    toast.error(handleError(error));
    if (error.response.status === 401) {
      return <Navigate to="/" replace />;
    }
  }

  return (
    <Box sx={{ m: 2, mb: 10 }}>
      <Box component={"article"}>
        <Container maxWidth="xl">
          <Box
            component={"div"}
            sx={{ display: "flex", justifyContent: "space-between", mb: 6 }}
          >
            <Typography variant="h4"> مهارت‌آموزان من</Typography>
          </Box>

          <AccordionStyled>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                mb: 1.5,
              }}
            >
              {/* //! export excel */}

              <ExcelExport
                fileName={`student list of ${user_name}`}
                linkAll={`/${role}/user/student`}
                searchData={null}
                useIn="studentsAssignee"
              />
            </Box>
          </AccordionStyled>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHeader headerItems={assigneeStudentTableHeader} />
              <TableBody>
                {data?.map((moodleUser, i: number) => {
                  const { student, module, mentorsAndTAs, enrollment } =
                    moodleUser || {};
                  const { category, id: module_id } = module;
                  const {
                    id,
                    firstName,
                    family,
                    picture,
                    city,
                    registrationForm,
                    careerPathway,
                  } = student || {};

                  const mentors = mentorsAndTAs.find(
                    (i) => i.personnelRole === "mentor"
                  );
                  const ta = mentorsAndTAs.find(
                    (i) => i.personnelRole === "ta"
                  );

                  return (
                    <StyledTableRow
                      key={id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <StyledTableCell
                        align="center"
                        sx={{
                          verticalAlign: "center",
                        }}
                      >
                        <Typography variant="body2">{i + 1}</Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <TablePic picture={picture} lastName={family} />
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{
                          verticalAlign: "center",
                        }}
                      >
                        <Typography variant="body1">
                          <Link to={`${id}`}>{`${firstName} ${family}`}</Link>
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell
                        align="center"
                        sx={{
                          verticalAlign: "center",
                        }}
                      >
                        <Typography variant="body2">
                          {category?.name}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{
                          verticalAlign: "center",
                        }}
                      >
                        <Typography variant="body2">
                          {registrationForm?.province || "-"}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{
                          verticalAlign: "center",
                        }}
                      >
                        <Typography variant="body2">
                          {registrationForm?.city || city || "-"}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell
                        align="center"
                        sx={{
                          verticalAlign: "center",
                        }}
                      >
                        <Typography variant="body2">
                          {registrationForm?.refer || "-"}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell
                        align="center"
                        sx={{
                          verticalAlign: "center",
                        }}
                      >
                        <Typography variant="body2" textAlign={"center"}>
                          {careerPathway?.name ?? "-"}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{
                          verticalAlign: "center",
                        }}
                      >
                        <Typography variant="body2" textAlign={"center"}>
                          <Link to={`${STUDENT_MODULE_PATH}/${module_id}`}>
                            {module?.name || "-"}
                          </Link>
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell
                        align="center"
                        sx={{
                          verticalAlign: "center",
                        }}
                      >
                        <Typography variant="body2">
                          {module?.teachingStatus || "-"}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell
                        align="center"
                        sx={{
                          verticalAlign: "center",
                        }}
                      >
                        <Typography variant="body2">
                          {ta
                            ? ta?.personnel.firstName +
                              " " +
                              ta?.personnel.family
                            : "-"}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell
                        align="center"
                        sx={{
                          verticalAlign: "center",
                        }}
                      >
                        <Typography variant="body2">
                          {mentors
                            ? mentors?.personnel.firstName +
                              " " +
                              mentors?.personnel.family
                            : "-"}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell
                        align="center"
                        sx={{
                          verticalAlign: "center",
                        }}
                      >
                        <Typography variant="body2">
                          {enrollment.assessment.finalGrade ?? "-"}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{
                          verticalAlign: "center",
                        }}
                      >
                        <Typography variant="body2">
                          {enrollment?.assessment?.finalAssessment ?? "-"}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{
                          verticalAlign: "center",
                          cursor: "pointer",
                        }}
                      >
                        <Typography variant="body2">
                          <Link to={`${module_id}/${id}`}>مشاهده</Link>
                        </Typography>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </Box>
  );
};
export default StudentTableAssignee;
