import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AddOrEditComment from "../../components/comment/AddOrEditComment";
import { StudentId } from "../../model";
import { SelectBox } from "../../styles/addComment/formBox";

const AddComment = () => {
  const [studentId, setStudentId] = useState<StudentId | null>(null);

  const { state, pathname }: any = useLocation();

  useEffect(() => {
    state && setStudentId({ id: state.student.id });
  }, [state]);

  if (!state) {
    //if add url in address bar(not push the button) so you don't have state
    //return to the student detail
    return <Navigate to={pathname.slice(0, -12)} />;
  }
  const { student } = state as any;

  return (
    <Container>
      <SelectBox>
        <Typography variant="h5" gutterBottom sx={{ width: "100% !important" }}>
          ثبت گزارش برای {student.firstName} {student.lastName}
        </Typography>
      </SelectBox>
      <AddOrEditComment
        studentId={studentId}
        compType={"adding"}
        allComment={null}
      />
    </Container>
  );
};

export default AddComment;
