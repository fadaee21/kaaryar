import {
  Autocomplete,
  Button,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import DatePicker from "../../pages/comment/DatePicker";
import React, { useEffect, useState } from "react";
import { useAddComment } from "../../hooks/request/useAddComment";
import { Course } from "../../model";
import { FormBox, SelectBox } from "../../styles/addComment/formBox";
import Commenting from "./Commenting";
import dayjs, { Dayjs } from "dayjs";

const allParticipation = [
  {
    message:
      "بالاتر از حد انتظار  (مهارت‌آموز موضوعاتی را از قبل آماده کرده بود و در جلسه مشارکت فعال داشت)",
  },
  {
    message:
      "پایین‌تر از حد انتظار   (مهارت‌آموز موضوعی برای صحبت کردن آماده نکرده بود و به سوالاتی که مطرح می‌شد جواب‌های کوتاه می‌داد)",
  },
  {
    message:
      "قابل قبول   (مهارت‌آموز موضوعی برای صحبت کردن آماده نکرده بود؛ اما در بحث شرکت می‌کرد و به سوالات جواب‌های مفصلی می‌داد)",
  },
  { message: "این یک کامنت کوتاه برای تست ۲۳" },
];
const allPresence = [
  { message: "بله" },
  { message: "خیر" },
  { message: "فقط بخشی از جلسه را حضور داشت" },
];
const allSignificantProblem = [
  {
    message:
      "مشکل عمده مانند نارضایتی کامل مهارت‌آموز و اظهار علاقه به خروج از دوره، خرابی لپ‌تاپ و عدم دسترسی به کامپیوتر؛  مشکل جزئی مانند حضور مهارت‌آموز در مکانی شلوغ و ...",
  },
  { message: "بله؛ مشکل عمده‌ای که نیاز به توجه فوری کاریار دارد" },
  { message: "بله؛ مشکلی جزئی وجود داشت" },
  { message: "خیر؛ مشکلی وجود نداشت" },
  { message: "این یک کامنت کوتاه برای تست ۷۶" },
];
const allHomework = [
  { message: "تکلیف را به طور کامل انجام داده بود" },
  {
    message:
      "تکلیف را انجام نداده بود؛ بهتر است تیم کاریار هم در این مورد پیگیری کند",
  },
  { message: "تکلیف را انجام نداده بود؛ با خودش روند پیگیری را هماهنگ کردم" },
  { message: "تکلیفی برای این جلسه در نظر گرفته نشد بود" },
  { message: "این یک کامنت کوتاه برای تست ۹۸" },
];

const AddCommentComp = ({ studentId }: any) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [studentContribute, setStudentContribute] = useState("");
  const [studentPresent, setStudentPresent] = useState("");
  const [studentTask, setStudentTask] = useState("");
  const [sessionProblem, setSessionProblem] = useState("");
  const [sessionDate, setSessionDate] = useState<Dayjs | null>(dayjs());
  const [comment, setComment] = useState("");

  const { setErrMsg, allCourse, postComment, errMsg } = useAddComment(
    course,
    studentId,
    comment,
    sessionDate!.toISOString(),
    studentContribute,
    studentTask,
    sessionProblem,
    studentPresent
  );
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postComment();
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
        />
      </SelectBox>
      <SelectBox>
        <Typography variant="body2" gutterBottom>
          تاریخ جلسه
        </Typography>
        <DatePicker setSessionDate={setSessionDate} sessionDate={sessionDate} />
      </SelectBox>
      <Commenting
        allChoice={allPresence}
        description="آیا مهارت آموز در جلسه حاضر بود؟"
        handleChange={setStudentPresent}
        id="studentPresent"
        value={studentPresent}
      />
      <Commenting
        allChoice={allParticipation}
        description="میزان مشارکت مهارت‌آموز در جلسه را چطور ارزیابی می‌کنید؟"
        handleChange={setStudentContribute}
        id="studentContribute"
        value={studentContribute}
      />
      <Commenting
        allChoice={allHomework}
        description="در صورتی که تکلیف (یا هر اقدام پیشنهادی) 
            برای مهارت‌آموز در نظر گرفته شده بود، لطفا یکی از گزینه‌های زیر را انتخاب کنید."
        handleChange={setStudentTask}
        id="studentTask"
        value={studentTask}
      />
      <Commenting
        allChoice={allSignificantProblem}
        description="آیا مشکل قابل توجهی در جلسه وجود داشت؟"
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
            !comment ||
            !studentId
          }
        >
          ارسال
        </Button>
        <FormHelperText error>
          <Typography variant="caption">{errMsg ? errMsg : " "}</Typography>
        </FormHelperText>
      </SelectBox>
    </FormBox>
  );
};

export default AddCommentComp;
