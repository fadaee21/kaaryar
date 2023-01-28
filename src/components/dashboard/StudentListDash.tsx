import { Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useMoodleAssignee from "../../hooks/request/useMoodleAssignee";
import { BoxDashboard, PaperDashboard } from "../../styles/dashboard";
import LoadingProgress from "../LoadingProgress";

const StudentListDash = () => {
  const { getListAssignee, loading, students } = useMoodleAssignee();
  useEffect(() => {
    getListAssignee();
  }, []);
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
