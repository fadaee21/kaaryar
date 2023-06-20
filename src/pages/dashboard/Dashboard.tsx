import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import LoadingProgress from "../../components/LoadingProgress";
import StudentCard from "../../components/student/StudentCard";

import { MoodleUserAssignee } from "../../model";
import useGetMoodleStudents from "../../hooks/request/useGetMoodleStudents";

const Dashboard = () => {
  const { students, loading, error } = useGetMoodleStudents(
    "/moodle/user/assignee"
  );

  if (loading) {
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
        {students.map((student: MoodleUserAssignee) => (
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
