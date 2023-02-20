import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useCountPagination from "../../hooks/request/useCountPagination";
import useAwaitingConfirm from "../../hooks/request/useAwaitingConfirm";
import { BoxDashboard, PaperDashboard } from "../../styles/dashboard";
import LoadingProgress from "../LoadingProgress";

const RegListDB = () => {
  const [loading, counterPage] = useCountPagination("/reg/form/count");
  const [loadingAwait, awaitNumber] = useAwaitingConfirm("/reg/search/param");
  const navigate = useNavigate();
  if (loading && loadingAwait) {
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
        {!!awaitNumber
          ? ` تعداد ${awaitNumber} مورد در انتظار تایید وجود دارد.`
          : "مورد جدیدی برای بررسی وجود ندارد."}
      </Typography>
      <Typography variant="body2">تعداد کل: {counterPage}</Typography>
    </PaperDashboard>
  );
};

export default RegListDB;
