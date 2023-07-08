import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { JalaliDatePicker } from "./JalaliDatePicker";
import { FormEvent, useState } from "react";
import { useAddComment } from "../../hooks/request/useAddComment";
import { Comment, ModulesAsStudentModule } from "../../model";
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
import { Select } from "@mui/material";

interface AddCommentType {
  compType: "adding" | "editing";
  allComment: Comment | null; //this prop just for editing
}
const AddOrEditComment = ({ compType, allComment }: AddCommentType) => {
  const [course, setCourse] = useState<ModulesAsStudentModule | null>(
    allComment ? allComment.module : null
  );
  const [studentContribute, setStudentContribute] = useState(
    allComment?.studentContribution ?? ""
  );
  const [studentPresent, setStudentPresent] = useState(
    allComment?.studentPresent || ""
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

  const { allCourse, postComment, putComment, courseLoading } = useAddComment(
    course,
    comment,
    sessionDate!.toISOString(),
    sessionProblem,
    studentTask,
    studentContribute,
    studentPresent
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    compType === "adding" && postComment();
    compType === "editing" && putComment(allComment?.id);
  };

  const defaultProps1 = {
    options: allCourse,
    getOptionLabel: (option: ModulesAsStudentModule) => option.name,
  };

  return (
    <FormBox component="form" onSubmit={handleSubmit}>
      <SelectBox>
        <Typography variant="body2" gutterBottom>
          نام دوره
        </Typography>
        {!courseLoading && allCourse ? (
          <Autocomplete
            {...defaultProps1}
            disablePortal
            id="course-name"
            options={allCourse}
            renderInput={(params) => <TextField {...params} />}
            onChange={(
              _event: any,
              newValue: ModulesAsStudentModule | null
            ) => {
              setCourse(newValue);
            }}
            value={course}
            isOptionEqualToValue={(option, value) => option.name === value.name}
          />
        ) : (
          <Select disabled  value={""} />
        )}
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
        description={descComment.allStudentPresent}
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
      </SelectBox>
    </FormBox>
  );
};

export default AddOrEditComment;
