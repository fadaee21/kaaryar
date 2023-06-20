import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcherGet } from "../../api/axios";
import { ShortCoreModule } from "../../model";
import LoadingProgress from "../../components/LoadingProgress";
import CoreModuleCourseCompEdit from "../../components/coreCourse/edit/CoreModuleCourseCompEdit";
import Container from "@mui/material/Container";

const CoreModuleCourseEdit = () => {
  const { coreId } = useParams();
  const navigate = useNavigate();
  const Core_Module_DETAIL = `/modules/details/${coreId}`;

  const { data, isLoading, error } = useSWR<ShortCoreModule>(
    Core_Module_DETAIL,
    fetcherGet
  );
  if (error) {
    console.log(error);
    navigate("/");
  }
  if (isLoading) {
    return <LoadingProgress />;
  }
 
  return (
    <Container maxWidth="lg">
      <CoreModuleCourseCompEdit coreDetail={data} />
    </Container>
  );
};

export default CoreModuleCourseEdit;
