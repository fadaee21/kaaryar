import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import LoadingProgress from "../../components/LoadingProgress";
import StudentCard from "../../components/student/StudentCard";
import useSWR from "swr";

import { useAuth } from "../../context/AuthProvider";
// import { toast } from "react-toastify";
// import { handleError } from "../../utils/handleError";
import { Navigate } from "react-router-dom";
import { AssigneeStudentsAll } from "../student/studentMentorTaType";

const Dashboard = () => {
  const {
    auth: { username: user_name },
  } = useAuth();
  const { data, isLoading, error } = useSWR<AssigneeStudentsAll>(
    `/user/profile/username/${user_name}/students/active`
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
        {data?.map((student) => (
          <Grid item sm={12} md={6} key={student.id}>
            <StudentCard moodleUser={student} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
