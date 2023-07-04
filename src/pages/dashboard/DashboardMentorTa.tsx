import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import LoadingProgress from "../../components/LoadingProgress";
import StudentCard from "../../components/student/StudentCard";
import useSWR from "swr";
import { MoodleUserAssignee } from "../../model";


const Dashboard = () => {
  const { data, isLoading, error } = useSWR("/moodle/user/assignee");

  if (isLoading) {
    return <LoadingProgress />;
  }
  if (error) {
    return (
      <p style={{ display: "flex", justifyContent: "center" }}>Loading Error</p>
    );
  }

  return (
    <Container maxWidth={"lg"}>
      <Grid container spacing={4}>
        {data.map((student: MoodleUserAssignee) => (
          <Grid item sm={12} md={6} key={student.id}>
            {student.assigneeContext.student && (
              <StudentCard moodleUser={student} />
            )}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
