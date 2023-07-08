import { Button, Container, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import AddOrEditComment from "../../components/comment/AddOrEditComment";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AddComment = () => {
  const navigate = useNavigate();
  const { state, pathname } = useLocation();

  if (!state) {
    //if add url in address bar(not push the button) so you don't have state
    //return to the student detail
    return <Navigate to={pathname.slice(0, -12)} />;
  }
  const { student } = state as any;

  return (
    <Container maxWidth="lg">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" gutterBottom>
          ثبت گزارش برای {student.firstName} {student.lastName}
        </Typography>
        <Button
          onClick={() => navigate(-1)}
          endIcon={<ArrowBackIcon />}
          variant="outlined"
          color="inherit"
        >
          بازگشت
        </Button>
      </Stack>

      <AddOrEditComment compType={"adding"} allComment={null} />
    </Container>
  );
};

export default AddComment;
