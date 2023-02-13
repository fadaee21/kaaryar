import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { MoodleUserAssignee } from "../../model";
import { Button, CardActions, Divider, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { TablePic2 } from "../table/TablePic";

export default function StudentCard({
  moodleUser,
}: {
  moodleUser: MoodleUserAssignee;
}) {
  const { studentId, studentFamily, studentName } = moodleUser;
  const navigate = useNavigate();
  const { auth } = useAuth();
  const roles = auth.roles.toString();

  //for adding comment i use state as below structure, so i change the name before insert into state navigation, it's necessary for AddComment page
  const student = {
    firstName: studentName,
    lastName: studentFamily,
    id: studentId,
  };

  return (
    <Card sx={{ minWidth: 345, pb: 1 }}>
      <CardHeader
        avatar={<TablePic2 studentId={studentId} lastName={studentFamily} />}
        title={studentName + " " + studentFamily}
      />
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              phone
              {/* {email} */}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              email
              {/* {username} */}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              location
              {/* {username} */}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              course
              {/* {username} */}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Divider variant="middle" sx={{ my: 1 }} />
      <CardActions>
        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate(`/${roles}/student/${studentId}`)}
          fullWidth
        >
          مشاهده اطلاعات فردی
        </Button>
        <Button
          fullWidth
          size="small"
          variant="contained"
          onClick={() =>
            navigate(`/${roles}/student/${studentId}/add-comment/`, {
              state: {
                student: student,
              },
            })
          }
        >
          افزودن نظر جدید
        </Button>
      </CardActions>
    </Card>
  );
}