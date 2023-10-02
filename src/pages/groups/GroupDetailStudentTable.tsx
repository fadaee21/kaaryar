import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { Group } from "../../model";
import LoadingProgress from "../../components/LoadingProgress";
import CoreModuleCourseStudentsComp from "../../components/coreCourse/student/CoreModuleCourseStudentsComp";

const GroupDetailStudentTable = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const GROUP_Module_DETAIL = `/modules/categories/details/${groupId}`;

  const { data, isLoading, error } = useSWR<Group>(GROUP_Module_DETAIL);
  if (error) {
    console.log(error);
    navigate("/");
  }
  if (isLoading) {
    return <LoadingProgress />;
  }
  return (
    <>
      {data && (
        <Container maxWidth="xl">
          <header>
            <Stack direction="row" sx={{ alignItems: "flex-start" }}>
              <Stack sx={{ mr: "auto" }}>
                <Typography variant="h5">{`فهرست گروه‌ها > ${data.name} > مهارت آموزان این گروه`}</Typography>
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
            <CoreModuleCourseStudentsComp
              students={data.studentsWithDetails}
            />
            {/* //TODO: felan ke injori nist data haie sade va avalie student ro mide vali baiad ba in type baram biad */}
          </Box>
        </Container>
      )}
    </>
  );
};

export default GroupDetailStudentTable;
