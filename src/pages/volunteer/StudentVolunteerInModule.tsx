import Container from "@mui/material/Container";
import useSWR from "swr";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress";
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
import { IStudentVolunteerInModule } from "./StudentVolunteerInModuleType";
import { useAuth } from "../../context/AuthProvider";
import { useMemo } from "react";
const StudentVolunteerInModule = () => {
  const {
    auth: { roles },
  } = useAuth();
  const role = roles.toString();
  const navigate = useNavigate();
  const { username, moduleId } = useParams();
  const {
    data: dataCall,
    isLoading: loadingCall,
    error: errorCall,
  } = useSWR<IStudentVolunteerInModule[]>(
    `/user/profile/username/${username}/students`
  );

  const modules = useMemo(() => {
    if (moduleId && dataCall) {
      return dataCall.filter((i) => i.moduleId === parseInt(moduleId));
    }
    return [];
  }, [moduleId, dataCall]);

  const thisModule = useMemo(() => {
    if (moduleId && dataCall) {
      return dataCall.find((i) => i.moduleId === parseInt(moduleId));
    }
    return undefined;
  }, [moduleId, dataCall]);

  if (loadingCall) {
    return <LoadingProgress />;
  }
  if (errorCall) {
    toast.error(handleError(errorCall));
    return <Navigate to="/" replace />;
  }

  const mentorTa = thisModule?.mentorsAndTAs.find(
    (i) => i.personnelRole === role
  );
  const mentorTaFullName = mentorTa
    ? mentorTa.personnel.firstName + " " + mentorTa.personnel.family
    : "";

  return (
    <Container maxWidth="xl">
      <header>
        <Stack direction="row" sx={{ alignItems: "center", height: 100 }}>
          <Stack sx={{ mr: "auto" }}>
            <Typography variant="h5">{`${mentorTaFullName}  > دوره‌های فعالیت > ${thisModule?.module.name} > مهارت‌آموزان`}</Typography>
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
          <TableHeader headerItems={volunteerStudentTableHeader} />

          <TableBody>
            {modules.map((studentModule, inx) => {
              const { student, mentorsAndTAs } = studentModule;
              const { firstName, family, registrationForm, careerPathway } =
                student || {};
              const { refer, city, province } = registrationForm || {};
              const mentors = mentorsAndTAs.find(
                (i) => i.personnelRole === "mentor"
              );
              const ta = mentorsAndTAs.find((i) => i.personnelRole === "ta");
              const enrollment = studentModule.enrollment;
              const assessment = enrollment?.assessment;
              const finalAssessmentValue = assessment?.finalAssessment;
              const finalGrade = assessment?.finalGrade;

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
                  finalAssessmentValue={finalAssessmentValue}
                  finalGrade={finalGrade}
                  careerPathwayName={careerPathway?.name}
                  categoryName={studentModule.module?.category?.name}
                  province={province}
                  city={city}
                  refer={refer}
                  studentFullName={firstName + " " + family}
                  teachingStatus={studentModule.module?.teachingStatus}
                  moduleName={studentModule.module?.name}
                  id={studentModule.studentId}
                  role={role}
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
