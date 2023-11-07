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

import {
  allStudentTask,
  allStudentContribute,
  allSessionProblem,
  allStudentPresent,
  descComment,
} from "./commentOptions";
import { Select, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface AddCommentType {
  compType: "adding" | "editing";
  allComment?: Comment; //this prop just for editing
  studentName: { firstName: string; lastName?: string ,family?: string } | null;
}
const AddOrEditComment = ({
  compType,
  allComment,
  studentName,
}: AddCommentType) => {
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
    allComment?.sessionDate ? new Date(allComment.sessionDate) : null
  );
  const [comment, setComment] = useState(allComment ? allComment.comment : "");

  const { allCourse, postComment, putComment, courseLoading, loading } =
    useAddComment(
      course,
      comment,
      sessionDate,
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
  const navigate = useNavigate();
  const isStudentPresentFalse =
    course && sessionDate && studentPresent === "خیر";
  const isButtonDisabled =
    !course ||
    !studentContribute ||
    !studentPresent ||
    !studentTask ||
    !sessionProblem ||
    !sessionDate ||
    !comment ||
    loading;
  //for activation the button user must fill out all fields except studentPresent equal to "خیر"
  const buttonStatus = isStudentPresentFalse
    ? false
    : isButtonDisabled
    ? true
    : false;

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" alignItems="center">
        {compType === "adding" ? (
          <Typography variant="h5" gutterBottom>
            ثبت گزارش برای {studentName?.firstName} {studentName?.lastName || studentName?.family}
          </Typography>
        ) : (
          <Typography variant="h5" gutterBottom>
            ویرایش گزارش برای {allComment?.student?.firstName}{" "}
            {allComment?.student?.family}
          </Typography>
        )}
        <Button
          variant="contained"
          type="submit"
          sx={{ px: 5, mr: 2, ml: "auto" }}
          disabled={buttonStatus}
        >
          {compType === "adding" ? "ارسال" : "ویرایش"}
        </Button>
        <Button
          onClick={() => navigate(-1)}
          endIcon={<ArrowBackIcon />}
          variant="outlined"
          color="inherit"
        >
          بازگشت
        </Button>
      </Stack>
      <FormBox>
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
              isOptionEqualToValue={(option, value) =>
                option.name === value.name
              }
            />
          ) : (
            <Select disabled value={""} />
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
      </FormBox>
    </form>
  );
};

export default AddOrEditComment;
