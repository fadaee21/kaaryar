import { Container } from "@mui/material";
import { Navigate, useLocation } from "react-router-dom";
import AddOrEditComment from "../../components/comment/AddOrEditComment";

const AddComment = () => {
  const { state, pathname } = useLocation();

  if (!state) {
    //if add url in address bar(not push the button) so you don't have state
    //return to the student detail
    return <Navigate to={pathname.slice(0, -12)} />;
  }
  const { student } = state as any;

  return (
    <Container maxWidth="lg">
      <AddOrEditComment
        compType={"adding"}
        allComment={null}
        studentName={student}
      />
    </Container>
  );
};

export default AddComment;
