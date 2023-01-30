import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useMoodle from "../../hooks/request/useMoodle";
import { BoxDashboard, PaperDashboard } from "../../styles/dashboard";
import LoadingProgress from "../LoadingProgress";

const StudentListDash = () => {
  //TODO:this is temporarily,alireza should create api to count this
  const { loading, students } = useMoodle(
    "moodle/user/all?pageNum=0&pageSize=10000"
  );

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
      <Typography variant="body2">تعداد کل: {students.length}</Typography>
    </PaperDashboard>
  );
};

export default StudentListDash;
