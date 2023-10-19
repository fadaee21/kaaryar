import Container from "@mui/material/Container";
import useSWR from "swr";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress";
import { VolunteerProfile } from "../../model";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";

import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TableHeader from "../../components/table/TableHeader";
import { volunteerStudentTableHeader } from "../../components/table/helper-header";
import StudentVolunteerRowComp from "../../components/volunteer/VolunteerDetailComp/student-volunteer/StudentVolunteerRowComp";
// import { useAuth } from "../../context/AuthProvider";
const StudentVolunteerInModule = () => {
  const { username, moduleId } = useParams();

  // const {
  //   adminVisibility,
  //   auth: { username: loggerUserName },
  // } = useAuth();
  const navigate = useNavigate();
  const {
    data: dataCall,
    isLoading: loadingCall,
    error: errorCall,
  } = useSWR<VolunteerProfile>(`/user/profile/username/${username}`);

  if (loadingCall) {
    return <LoadingProgress />;
  }
  if (errorCall) {
    toast.error(handleError(errorCall));
    return <Navigate to="/" replace />;
  }

  // const whoCanSeeCommentField = adminVisibility || username === loggerUserName;
  const modules =
    moduleId && dataCall
      ? dataCall.modules.find((i) => i.moduleId === parseInt(moduleId))
      : undefined;
  const categoryName = modules?.module.category.name;
  const moduleName = modules?.module.name;
  const teachingStatus = modules?.module.teachingStatus;
  // TODO: waiting for finalProjectGrade and finalAssessment from API
  return (
    <Container maxWidth="xl">
      <header>
        <Stack direction="row" sx={{ alignItems: "center", height: 100 }}>
          <Stack sx={{ mr: "auto" }}>
            <Typography variant="h5">{`${dataCall?.firstName} ${dataCall?.lastName} > دوره‌های فعالیت > ${dataCall?.studentCounts[0]?.module.name} > مهارت‌آموزان`}</Typography>
          </Stack>
          <Button
            variant="outlined"
            sx={{ px: 5 }}
            color="inherit"
            endIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            بازگشت
          </Button>
        </Stack>
      </header>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHeader
            headerItems={
              volunteerStudentTableHeader
              // whoCanSeeCommentField
              // ? volunteerStudentTableHeader
              // : volunteerStudentTableHeader.slice(0, -1)
            }
          />

          <TableBody>
            {modules?.studentsList?.map((studentModule, inx) => {
              const { student, mentorsAndTAs } = studentModule;
              const { firstName, family, registrationForm, careerPathway } =
                student || {};
              const { refer, city, province } = registrationForm || {};
              const mentors = mentorsAndTAs.find(
                (i) => i.personnelRole === "mentor"
              );
              const ta = mentorsAndTAs.find((i) => i.personnelRole === "ta");
              return (
                <StudentVolunteerRowComp
                  key={inx}
                  counter={inx + 1}
                  assignedMentorFullName={
                    mentors
                      ? mentors?.personnel.firstName +
                        " " +
                        mentors?.personnel.family
                      : "-"
                  }
                  assignedTaFullName={
                    ta
                      ? ta?.personnel.firstName + " " + ta?.personnel.family
                      : "-"
                  }
                  finalAssessmentValue="?"
                  finalGrade={0}
                  careerPathwayName={careerPathway?.name}
                  categoryName={categoryName}
                  province={province}
                  city={city}
                  refer={refer}
                  studentFullName={firstName + " " + family}
                  teachingStatus={teachingStatus}
                  moduleName={moduleName}
                  // whoCanSeeCommentField={whoCanSeeCommentField}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default StudentVolunteerInModule;
