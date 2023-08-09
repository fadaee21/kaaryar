import LoadingProgress from "../../components/LoadingProgress";
import useGetOneComment from "../../hooks/request/useGetOneComment";
import { Container } from "@mui/material";
import AddOrEditComment from "../../components/comment/AddOrEditComment";

const EditComments = () => {
  const { allComment, loading } = useGetOneComment();

  if (loading) {
    return <LoadingProgress />;
  }
  return (
    <Container maxWidth="lg">
      <AddOrEditComment
        compType="editing"
        allComment={allComment}
        studentName={null}
      />
    </Container>
  );
};

export default EditComments;
