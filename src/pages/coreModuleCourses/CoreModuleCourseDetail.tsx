import { Button, Container, Stack, Typography } from "@mui/material";
import TrainingCourseDetailComp from "../../components/coreCourse/detail/CoreModuleCourseComp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import useSWR from "swr";
import { persianDate } from "../../utils/persianDate";
import { ShortCoreModule } from "../../model";
import LoadingProgress from "../../components/LoadingProgress";
import { useAuth } from "../../context/AuthProvider";

const CoreModuleCourseDetail = () => {
  const { coreId } = useParams();
  const navigate = useNavigate();
  const Core_Module_DETAIL = `/modules/details/${coreId}`;
  const { adminVisibility } = useAuth();
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
            <Typography variant="h6">{`فهرست دوره‌های تخصصی > ${data?.name}`}</Typography>
            {adminVisibility && (
              <Typography variant="subtitle1">{`ساخته‌شده در ${persianDate(
                data?.createdAt
              )}${
                data?.updatedAt
                  ? `، آخرین ویرایش در ${persianDate(data.updatedAt)}`
                  : ""
              }`}</Typography>
            )}
          </Stack>
          {adminVisibility && (
            <Button
              endIcon={<EditIcon />}
              variant="outlined"
              onClick={() => navigate("edit")}
              sx={{ mr: 2, px: 5 }}
            >
              ویرایش
            </Button>
          )}
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
      <TrainingCourseDetailComp coreDetail={data} />
    </Container>
  );
};

export default CoreModuleCourseDetail;
