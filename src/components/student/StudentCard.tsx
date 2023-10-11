import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions, Divider, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { TablePic2 } from "../table/TablePic";
import { AssigneeStudent } from "../../pages/student/studentMentorTaType";

interface Props {
  moodleUser: AssigneeStudent;
}

export default function StudentCard({ moodleUser }: Props) {
  const { student: studentRes } = moodleUser || {};
  const { firstName, family, email, city, id, mobile, phone } = studentRes;
  const navigate = useNavigate();
  const { auth } = useAuth();
  const roles = auth.roles.toString();

  //for adding comment i use state as below structure, so i change the name before insert into state navigation, it's necessary for AddComment page
  const student = {
    firstName: firstName,
    lastName: family,
  };

  return (
    <Card
      sx={{
        minWidth: 345,
        height: 300,
        pb: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardHeader
        avatar={<TablePic2 studentId={id} lastName={family} />}
        title={firstName + " " + family}
      />
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              تلفن: {(mobile ?? phone) || " - "}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              ایمیل: {email || " - "}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              شهر: {city || " - "}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            {/* <Typography variant="body2" color="text.secondary">
              course
            </Typography> */}
          </Grid>
        </Grid>
      </CardContent>
      <Divider variant="middle" sx={{ mt: "auto", mb: 2 }} />
      <CardActions>
        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate(`/${roles}/student/${id}`)}
          fullWidth
        >
          مشاهده اطلاعات فردی
        </Button>
        <Button
          fullWidth
          size="small"
          variant="contained"
          onClick={() =>
            navigate(`/${roles}/student/${id}/add-comment/`, {
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
