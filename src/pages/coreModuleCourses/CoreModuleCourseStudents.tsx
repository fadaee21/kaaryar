import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { ShortCoreModule } from "../../model";
import LoadingProgress from "../../components/LoadingProgress";
import CoreModuleCourseStudentsComp from "../../components/coreCourse/student/CoreModuleCourseStudentsComp";
import { getTitle } from "../../utils/courseMethod";

const CoreModuleCourseStudents = () => {
  const { coreId } = useParams();
  const navigate = useNavigate();
  const Core_Module_DETAIL = `/modules/details/${coreId}`;

  const { data, isLoading, error } =
    useSWR<ShortCoreModule>(Core_Module_DETAIL);
  if (error) {
    console.log(error);
    navigate("/");
  }
  if (isLoading) {
    return <LoadingProgress />;
  }
  return (
    <Container maxWidth="xl">
      <header>
        <Stack direction="row" sx={{ alignItems: "flex-start" }}>
          <Stack sx={{ mr: "auto" }}>
            {data?.moduleType === "general" ? (
              <Typography variant="h6">
                {`فهرست دوره‌های عمومی > ${getTitle(data?.subType)}  > ${
                  data?.name
                } > مهارت آموزان این دوره`}
              </Typography>
            ) : (
              <Typography variant="h6">{`فهرست دوره‌های تخصصی > ${data?.name} > مهارت آموزان این دوره`}</Typography>
            )}
          </Stack>
          <Button
            variant="outlined"
            sx={{ px: 5 }}
            color="inherit"
            endIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            بازگشت
          </Button>
        </Stack>
      </header>
      <Box sx={{ my: 6 }}>
        <CoreModuleCourseStudentsComp students={data?.studentsWithDetails} />
      </Box>
    </Container>
  );
};

export default CoreModuleCourseStudents;
