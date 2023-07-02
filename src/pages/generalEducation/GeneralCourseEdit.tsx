import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { ShortCoreModule } from "../../model";
import LoadingProgress from "../../components/LoadingProgress";

import Container from "@mui/material/Container";
import GeneralCourseCompEdit from "../../components/generalCourse/GeneralCourseCompEdit";

const GeneralCourseEdit = () => {
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
    <Container maxWidth="lg">
      <GeneralCourseCompEdit generalDetail={data} />
    </Container>
  );
};

export default GeneralCourseEdit;
