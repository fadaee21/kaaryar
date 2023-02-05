import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useCountPagination from "../../hooks/request/useCountPagination";
import { BoxDashboard, PaperDashboard } from "../../styles/dashboard";
import LoadingProgress from "../LoadingProgress";
const studentCount = "moodle/user/student/count";

const StudentListDash = () => {
  const [loading, counterPage] = useCountPagination(studentCount);

  const navigate = useNavigate();
  if (loading) {
    return (
      <PaperDashboard>
        <LoadingProgress usage="paper" />
      </PaperDashboard>
    );
  }

  return (
    <PaperDashboard>
      <BoxDashboard>
        <Typography variant="body1">فهرست مهارت آموزان</Typography>
        <Button
          variant="text"
          color="info"
          onClick={() => navigate("/admin/student")}
        >
          مشاهده
        </Button>
      </BoxDashboard>
      <Typography variant="body2">تعداد کل: {counterPage}</Typography>
    </PaperDashboard>
  );
};

export default StudentListDash;
