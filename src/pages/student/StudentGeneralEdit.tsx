import { Container } from "@mui/material";
import LoadingProgress from "../../components/LoadingProgress";
import useSWR from "swr";
import { ModuleAsStudentForDetail } from "../../model";
import StudentGeneralDetailEdit from "../../components/student/StudentGeneralDetailEdit";

import { useNavigate, useParams } from "react-router-dom";

const StudentGeneralEdit = () => {
  const { student_id, module_id } = useParams();
  const navigate = useNavigate();
  const MODULE_STUDENT_DETAIL = `/modules/student/enrollment/details/${module_id}/${student_id}`;
  const { data, isLoading, error, mutate } = useSWR<ModuleAsStudentForDetail>(
    MODULE_STUDENT_DETAIL
  );
  if (isLoading) return <LoadingProgress />;
  if (error) navigate("/");

  return (
    <Container maxWidth="lg">
      <StudentGeneralDetailEdit
        assessment={data?.assessment}
        student={data?.student}
        module={data?.module}
        mutate={mutate}
      />
    </Container>
  );
};

export default StudentGeneralEdit;
