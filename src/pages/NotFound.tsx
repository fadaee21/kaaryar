import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "grid",
        placeContent: "center",
        height: "80vh",
      }}
    >
      <h3>متاسفیم، صفحه مورد نظر یافت نشد</h3>
      <h1 style={{ textAlign: "center" }}>404</h1>
      <Stack direction="column" gap={2}>
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => navigate("/", { replace: true })}
        >
          بازگشت به داشبورد
        </Button>
        <Button variant="outlined" color="inherit" onClick={() => navigate(-1)}>
          بازگشت به صفحه قبل
        </Button>
      </Stack>
    </div>
  );
};

export default NotFound;
