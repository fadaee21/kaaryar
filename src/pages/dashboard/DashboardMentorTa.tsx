import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import LoadingProgress from "../../components/LoadingProgress";
import StudentCard from "../../components/student/StudentCard";
import useSWR from "swr";

import { useAuth } from "../../context/AuthProvider";
// import { toast } from "react-toastify";
// import { handleError } from "../../utils/handleError";
import { StudentEdu } from "../../model";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const {
    auth: { roles },
  } = useAuth();
  const { data, isLoading, error } = useSWR<StudentEdu[]>(
    `/${roles}/user/student`
  );

  if (isLoading) {
    return <LoadingProgress />;
  }
  if (error) {
    // toast.error(handleError(error));
    if (error.response.status === 401) {
      return <Navigate to="/" replace />;
    }
  }

  return (
    <Container maxWidth={"lg"}>
      <Grid container spacing={4}>
        {data?.map((student: StudentEdu) => (
          <Grid item sm={12} md={6} key={student.id}>
            <StudentCard moodleUser={student} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
