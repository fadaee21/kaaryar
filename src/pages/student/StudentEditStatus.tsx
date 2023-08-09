import { useNavigate, useParams } from "react-router-dom";
import StudentStatusEditComp from "../../components/student/StudentStatusEditComp";
import useSWR from "swr";
import { StudentInfo } from "../../model";
import LoadingProgress from "../../components/LoadingProgress";
import { Container } from "@mui/material";
const StudentEditStatus = () => {
  const { id } = useParams();
  const studentProfile = `/moodle/user/${id}`;
  const { data, isLoading, error } = useSWR<StudentInfo>(studentProfile);
  const navigate = useNavigate();

  if (isLoading) return <LoadingProgress />;
  if (error) navigate("/");

  return (
    <Container maxWidth="lg">
      <StudentStatusEditComp
        firstName={data?.firstName}
        family={data?.family}
        statusForm={data?.statusForm}
      />
    </Container>
  );
};

export default StudentEditStatus;
