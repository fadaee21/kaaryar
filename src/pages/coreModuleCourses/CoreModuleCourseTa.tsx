import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { ShortCoreModule } from "../../model";
import LoadingProgress from "../../components/LoadingProgress";
import CoreModuleCourseMentorTaComp from "../../components/coreCourse/mentorTa/CoreModuleCourseMentorTaComp";

const CoreModuleCourseTa = () => {
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
            <Typography variant="h6">{`فهرست دوره‌های تخصصی > ${data?.name} >  مربیان حل تمرین فعال این دوره`}</Typography>
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
        <CoreModuleCourseMentorTaComp mentorTa={data?.teachingAssistants} />
      </Box>
    </Container>
  );
};

export default CoreModuleCourseTa;
