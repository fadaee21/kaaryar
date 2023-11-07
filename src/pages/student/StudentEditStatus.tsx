import { useNavigate, useParams } from "react-router-dom";
import StudentStatusEditComp from "../../components/student/StudentStatusEditComp";
import useSWR from "swr";
import { AfterWeekType, StudentInfo } from "../../model";
import LoadingProgress from "../../components/LoadingProgress";
import { Container } from "@mui/material";
const StudentEditStatus = () => {
  const { id } = useParams();
  const studentProfile = `/moodle/user/${id}`;
  const moodleProfile = `/exam/after/week/form/moodle/${id}`;
  const { data, isLoading, error } = useSWR<StudentInfo>(studentProfile);
  const {
    data: dataMoodle,
    isLoading: isLoadingMoodle,
    error: errorMoodle,
  } = useSWR<AfterWeekType>(moodleProfile);
  const navigate = useNavigate();

  if (isLoading || isLoadingMoodle) return <LoadingProgress />;
  if (error || errorMoodle) navigate("/");

  return (
    <Container maxWidth="lg">
      <StudentStatusEditComp
        firstName={data?.firstName}
        family={data?.family}
        statusForm={data?.statusForm}
        careerPathwayId={dataMoodle?.careerPathway?.id.toString() || ""}
      />
    </Container>
  );
};

export default StudentEditStatus;
