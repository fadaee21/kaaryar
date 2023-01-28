import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useCountPagination from "../../hooks/request/useCountPagination";
import useAwaitingConfirm from "../../hooks/useAwaitingConfirm";
import { BoxDashboard, PaperDashboard } from "../../styles/dashboard";
import LoadingProgress from "../LoadingProgress";

const BeforeListDash = () => {
  const navigate = useNavigate();
  const [loading, counterPage] = useCountPagination(
    "/exam/before/week/form/count"
  );
  const [loadingAwait, awaitNumber] = useAwaitingConfirm(
    "/exam/before/week/search/param"
  );
  console.log(counterPage);
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
        <Typography variant="body1">فهرست ارزیابی</Typography>
        <Button
          variant="text"
          color="info"
          onClick={() => navigate("/admin/before-week")}
        >
          مشاهده
        </Button>
      </BoxDashboard>
      <Typography variant="body2" sx={{ my: 2 }}>
        {!!awaitNumber
          ? ` تعداد ${awaitNumber} مورد در انتظار تایید وجود دارد`
          : "مورد جدیدی برای بررسی وجود ندارد"}
      </Typography>
      <Typography variant="body2">تعداد کل: {counterPage}</Typography>
    </PaperDashboard>
  );
};

export default BeforeListDash;
