import { useParams } from "react-router-dom";
import StudentStatusEditComp from "../../components/studentNew/StudentStatusEditComp";
import useSWR from "swr";
import { StudentInfo } from "../../model";
import LoadingProgress from "../../components/LoadingProgress";
import { Container } from "@mui/material";
const StudentEditStatus = () => {
  const { id } = useParams();
  const studentProfile = `/moodle/user/${id}`;
  const { data, isLoading, error } = useSWR<StudentInfo>(studentProfile);

  if (isLoading) return <LoadingProgress />;
  if (error) {
    return <p>ERROR</p>;
  }

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
