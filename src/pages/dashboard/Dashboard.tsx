import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import LoadingProgress from "../../components/LoadingProgress";
import StudentCard from "../../components/student/StudentCard";
import useMoodle from "../../hooks/request/useMoodle";
import { MoodleUserAssignee } from "../../model";

const Dashboard = () => {
  const { students, loading } = useMoodle("/moodle/user/assignee");

  if (loading) {
    return <LoadingProgress />;
  }

  return (
    <Container maxWidth={"lg"}>
      <Grid container spacing={4}>
        {students.map((student: MoodleUserAssignee) => (
          <Grid item sm={12} md={6} key={student.id}>
            <StudentCard moodleUser={student} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
