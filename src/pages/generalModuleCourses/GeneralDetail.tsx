import { Button, Container, Stack, Typography } from "@mui/material";
// import TrainingCourseDetailComp from "../../components/trainingCourse/detail/CoreModuleCourseComp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import useSWR from "swr";
import { persianDate } from "../../utils/persianDate";
import { ShortCoreModule } from "../../model";
import LoadingProgress from "../../components/LoadingProgress";
import { getTitle } from "../../utils/courseMethod";
import GeneralDetailComp from "../../components/generalCourse/GeneralDetailComp";

const GeneralDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const Module_DETAIL = `/modules/details/${id}`;

  const { data, isLoading, error } = useSWR<ShortCoreModule>(
    Module_DETAIL
  );
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
            <Typography variant="h6">{`فهرست دوره‌های عمومی > ${getTitle(
              data?.subType
            )} > ${data?.name}`}</Typography>
            <Typography variant="subtitle1">{`ساخته‌شده در ${persianDate(
              data?.createdAt
            )}${
              data?.updatedAt
                ? `، آخرین ویرایش در ${persianDate(data.updatedAt)}`
                : ""
            }`}</Typography>
          </Stack>
          <Button
            endIcon={<EditIcon />}
            variant="outlined"
            onClick={() => navigate(`/admin/general-course/edit/${id}`)}
            sx={{ mr: 2, px: 5 }}
          >
            ویرایش
          </Button>
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
      <GeneralDetailComp workshopDetail={data} />
    </Container>
  );
};

export default GeneralDetail;
