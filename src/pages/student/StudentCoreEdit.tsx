import { Container } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { ModuleAsStudentForDetail } from "../../model";
import LoadingProgress from "../../components/LoadingProgress";
import StudentCoreDetailEdit from "../../components/student/StudentCoreDetailEdit";

const StudentCoreEdit = () => {
  const { student_id, module_id } = useParams();
  const navigate = useNavigate();
  const MODULE_STUDENT_DETAIL = `/modules/student/enrollment/details/${module_id}/${student_id}`;
  const { data, isLoading, error } = useSWR<ModuleAsStudentForDetail>(
    MODULE_STUDENT_DETAIL
  );
  if (isLoading) return <LoadingProgress />;
  if (error) navigate("/");
  return (
    <Container maxWidth="lg">
      <StudentCoreDetailEdit
        assessment={data?.assessment}
        student={data?.student}
        personnelAssignment={data?.personnelAssignment}
        trainingStatus={data?.student.statusForm.trainingStatus}
      />
    </Container>
  );
};

export default StudentCoreEdit;
