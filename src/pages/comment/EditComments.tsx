import LoadingProgress from "../../components/LoadingProgress";
import useGetOneComment from "../../hooks/request/useGetOneComment";
import { Container, Typography } from "@mui/material";
import { SelectBox } from "../../styles/addComment/formBox";
import AddOrEditComment from "../../components/comment/AddOrEditComment";
// import EditCommentComp from "../../components/comment/Edi  tCommentComp";

const EditComments = () => {
  const { allComment, loading } = useGetOneComment();
  if (loading) {
    return <LoadingProgress />;
  }
  console.log(allComment);
  return (
    <Container>
      <SelectBox>
        <Typography variant="h5" gutterBottom sx={{ width: "100% !important" }}>
          ویرایش گزارش برای {allComment?.studentUser?.firstName}{" "}
          {allComment?.studentUser?.lastName}
        </Typography>
      </SelectBox>
      <AddOrEditComment
        compType="editing"
        allComment={allComment}
        studentId={null}
      />
    </Container>
  );
};

export default EditComments;
