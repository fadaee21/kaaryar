import { Navigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { ShortCoreModule } from "../../model";
import LoadingProgress from "../../components/LoadingProgress";

import Container from "@mui/material/Container";
import GeneralCourseCompEdit from "../../components/generalCourse/GeneralCourseCompEdit";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";

const GeneralCourseEdit = () => {
  const { id } = useParams();
  const Module_DETAIL = `/modules/details/${id}`;

  const { data, isLoading, error } = useSWR<ShortCoreModule>(Module_DETAIL);
   if (error) {
    toast.error(handleError(error));
    if (error.response.status === 401) {
      return <Navigate to="/" replace />;
    }
  }
  if (isLoading) {
    return <LoadingProgress />;
  }

  return (
    <Container maxWidth="lg">
      <GeneralCourseCompEdit generalDetail={data} />
    </Container>
  );
};

export default GeneralCourseEdit;
