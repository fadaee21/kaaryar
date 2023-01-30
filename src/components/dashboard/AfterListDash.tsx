import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useCountPagination from "../../hooks/request/useCountPagination";
import useAwaitingConfirm from "../../hooks/useAwaitingConfirm";
import { BoxDashboard, PaperDashboard } from "../../styles/dashboard";
import LoadingProgress from "../LoadingProgress";

const AfterListDash = () => {
  const navigate = useNavigate();
  const [loading, counterPage] = useCountPagination(
    "/exam/after/week/form/count"
  );
  const [loadingAwait, awaitNumber] = useAwaitingConfirm(
    "/exam/after/week/search/param"
  );

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
        <Typography variant="body1">فهرست هفته پذیرش</Typography>
        <Button
          variant="text"
          color="info"
          onClick={() => navigate("/admin/after-week")}
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

export default AfterListDash;
