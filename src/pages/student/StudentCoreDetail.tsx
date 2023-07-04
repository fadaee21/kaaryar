import { Button, Container, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";

import useSWR from "swr";
import { ModuleAsStudentForDetail } from "../../model";
import LoadingProgress from "../../components/LoadingProgress";
import StudentCoreDetailComp from "../../components/student/StudentCoreDetailComp";
import { useAuth } from "../../context/AuthProvider";
const StudentCoreDetail = () => {
  const { adminVisibility } = useAuth();
  const { student_id, module_id } = useParams();
  const navigate = useNavigate();
  const MODULE_STUDENT_DETAIL = `/modules/student/enrollment/details/${module_id}/${student_id}`;
  const { data, isLoading, error } = useSWR<ModuleAsStudentForDetail>(
    MODULE_STUDENT_DETAIL
  );

  if (isLoading) return <LoadingProgress />;
  if (error) return <p>ERROR</p>;
  return (
    <Container maxWidth="lg">
      <header>
        <Stack direction="row" sx={{ alignItems: "flex-start" }}>
          <Typography variant="h5">
            {data?.student?.firstName +
              " " +
              data?.student?.family +
              " > دوره‌های تخصصی"}
          </Typography>
          <Button
            endIcon={<EditIcon />}
            variant="outlined"
            onClick={() => navigate(`edit`)}
            disabled={!adminVisibility}
            sx={{
              mr: 2,
              px: 5,
              ml: "auto",
              ...(!adminVisibility && { visibility: "hidden" }),
            }}
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
      <StudentCoreDetailComp
        assessment={data?.assessment}
        module={data?.module}
      />
    </Container>
  );
};

export default StudentCoreDetail;
