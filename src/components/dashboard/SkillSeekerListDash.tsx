import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useCountPagination from "../../hooks/request/useCountPagination";
import { BoxDashboard, PaperDashboard } from "../../styles/dashboard";
import LoadingProgress from "../LoadingProgress";

const SkillSeekerListDash = () => {
  const [loading, counterPage] = useCountPagination("/status/form/count");
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
        <Typography variant="body1">فهرست متقاضیان</Typography>
        <Button
          variant="text"
          color="info"
          onClick={() => navigate("/admin/skill-seeker")}
        >
          مشاهده
        </Button>
      </BoxDashboard>
      <Typography variant="body2" sx={{ my: 2 }}>
        در این فهرست می‌توانید تمام افرادی که در مراحل ثبت‌نام، ارزیابی، و یا
        هفته پذیرش هستند، مشاهده کنید.
      </Typography>
      <Typography variant="body2">تعداد کل: {counterPage}</Typography>
    </PaperDashboard>
  );
};

export default SkillSeekerListDash;
