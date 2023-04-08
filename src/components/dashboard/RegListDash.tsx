import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useCountPagination from "../../hooks/request/useCountPagination";
import useStatusCount from "../../hooks/request/useStatusCount";
import { BoxDashboard, PaperDashboard } from "../../styles/dashboard";
import LoadingProgress from "../LoadingProgress";

const link = "/reg/form/count"

const RegListDB = () => {
  const [loading, counterPage] = useCountPagination(link);
  const [loadingStatus, statusNum] = useStatusCount(link,"pending");
  const navigate = useNavigate();
  if (loading || loadingStatus) {
    return (
      <PaperDashboard>
        <LoadingProgress usage="paper" />
      </PaperDashboard>
    );
  }

  return (
    <PaperDashboard>
      <BoxDashboard>
        <Typography variant="body1">فهرست ثبت نام</Typography>
        <Button
          variant="text"
          color="info"
          onClick={() => navigate("/admin/register-form")}
        >
          مشاهده
        </Button>
      </BoxDashboard>
      <Typography variant="body2" sx={{ my: 2 }}>
        {!!statusNum
          ? ` تعداد ${statusNum} مورد در انتظار تایید وجود دارد.`
          : "مورد جدیدی برای بررسی وجود ندارد."}
      </Typography>
      <Typography variant="body2">تعداد کل: {counterPage}</Typography>
    </PaperDashboard>
  );
};

export default RegListDB;
