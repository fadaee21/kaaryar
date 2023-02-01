import {
  Autocomplete,
  Button,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { JalaliDatePicker } from "./JalaliDatePicker";
import React, { useEffect, useState } from "react";
import { useAddComment } from "../../hooks/request/useAddComment";
import { Comment, Course, StudentId } from "../../model";
import { FormBox, SelectBox } from "../../styles/addComment/formBox";
import Commenting from "./Commenting";
import dayjs from "dayjs";
import {
  allStudentTask,
  allStudentContribute,
  allSessionProblem,
  allStudentPresent,
  descComment,
} from "./commentOptions";

interface AddCommentType {
  studentId: StudentId | null; //this prop just for adding
  compType: "adding" | "editing";
  allComment: Comment | null; //this prop just for editing
}
const AddOrEditComment = ({
  studentId,
  compType,
  allComment,
}: AddCommentType) => {
  const [course, setCourse] = useState<Course | null>(
    allComment ? allComment.course : null
  );
  const [studentContribute, setStudentContribute] = useState(
    allComment ? allComment.studentContribute : ""
  );
  const [studentPresent, setStudentPresent] = useState(
    allComment
      ? allComment.studentPresent === true
        ? "بله"
        : allComment.studentPresent === false
        ? "خیر"
        : "فقط بخشی از جلسه را حضور داشت"
      : ""
  );
  const [studentTask, setStudentTask] = useState(
    allComment ? allComment.studentTask : ""
  );
  const [sessionProblem, setSessionProblem] = useState(
    allComment ? allComment.sessionProblem : ""
  );
  const [sessionDate, setSessionDate] = useState<any>(
    allComment ? new Date(allComment.sessionDate) : dayjs()
  );
  const [comment, setComment] = useState(allComment ? allComment.comment : "");

  const { setErrMsg, allCourse, postComment, errMsg, putComment } =
    useAddComment(
      course,
      studentId,
      comment,
      sessionDate!.toISOString(),
      sessionProblem,
      studentTask,
      studentContribute,
      studentPresent
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    compType === "adding" && postComment();
    compType === "editing" &&
      putComment(allComment?.id, allComment?.studentUser);
  };

  useEffect(() => {
    setErrMsg("");
  }, [comment, course, setErrMsg, studentId]);

  const defaultProps1 = {
    options: allCourse,
    getOptionLabel: (option: Course) => option.courseName,
  };

  return (
    <FormBox component="form" onSubmit={handleSubmit}>
      <SelectBox>
        <Typography variant="body2" gutterBottom>
          نام دوره
        </Typography>
        <Autocomplete
          {...defaultProps1}
          disablePortal
          id="course-name"
          options={allCourse}
          renderInput={(params) => <TextField {...params} />}
          onChange={(event: any, newValue: Course | null) => {
            setCourse(newValue);
          }}
          value={course}
          isOptionEqualToValue={(option, value) =>
            option.courseName === value.courseName
          }
        />
      </SelectBox>
      <SelectBox>
        <Typography variant="body2" gutterBottom>
          تاریخ جلسه
        </Typography>
        <JalaliDatePicker
          setSessionDate={setSessionDate}
          sessionDate={sessionDate}
        />
      </SelectBox>
      <Commenting
        allChoice={allStudentPresent}
        description= {descComment.allStudentPresent}
        handleChange={setStudentPresent}
        id="studentPresent"
        value={studentPresent}
      />
      <Commenting
        allChoice={allStudentContribute}
        description={descComment.allStudentContribute}
        handleChange={setStudentContribute}
        id="studentContribute"
        value={studentContribute}
      />
      <Commenting
        allChoice={allStudentTask}
        description={descComment.allStudentTask}
        handleChange={setStudentTask}
        id="studentTask"
        value={studentTask}
      />
      <Commenting
        allChoice={allSessionProblem}
        description={descComment.allSessionProblem}
        handleChange={setSessionProblem}
        id="sessionProblem"
        value={sessionProblem}
      />

      <SelectBox>
        <Typography variant="body2" gutterBottom>
          لطفا گزارش کوتاهی از جلسه بنویسید
          <Typography variant="caption">
            (احساس خودتان، وضعیت مهارت آموز از نظر شما، تکالیف و پیشنهاداتی که
            به مهارت آموز داده‌اید و غیره)
          </Typography>
        </Typography>
        <TextField
          fullWidth
          id="outlined-multiline-static"
          multiline
          rows={4}
          onChange={(e) => setComment(e.target.value)}
          type="text"
          autoComplete="off"
          value={comment}
        />
      </SelectBox>
      <SelectBox>
        <Button
          variant="contained"
          type="submit"
          disabled={
            !course ||
            !studentContribute ||
            !studentPresent ||
            !studentTask ||
            !sessionProblem ||
            !sessionDate ||
            !comment
          }
        >
          {compType === "adding" ? "ارسال" : "ویرایش"}
        </Button>
        <FormHelperText error>
          <Typography variant="caption">{errMsg ? errMsg : " "}</Typography>
        </FormHelperText>
      </SelectBox>
    </FormBox>
  );
};

export default AddOrEditComment;
