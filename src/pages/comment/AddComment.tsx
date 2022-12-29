import {
  Autocomplete,
  Button,
  Container,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Commenting from "../../components/comment/Commenting";
import { useAddComment } from "../../hooks/request/useAddComment";
import dayjs, { Dayjs } from "dayjs";
import { Course, StudentUser } from "../../model";
import { FormBox, SelectBox } from "../../styles/addComment/formBox";
import DatePicker from "./DatePicker";

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
];
const allHomework = [
  { message: "تکلیف را به طور کامل انجام داده بود" },
  {
    message:
      "تکلیف را انجام نداده بود؛ بهتر است تیم کاریار هم در این مورد پیگیری کند",
  },
  { message: "تکلیف را انجام نداده بود؛ با خودش روند پیگیری را هماهنگ کردم" },
  { message: "تکلیفی برای این جلسه در نظر گرفته نشد بود" },
];

const AddComment = () => {
  const [courseName, setCourseName] = useState<Course | null>(null);
  const [participation, setParticipation] = useState("");
  const [presence, setPresence] = useState("");
  const [homework, setHomework] = useState("");
  const [significantProblem, setSignificantProblem] = useState("");
  const [dateSession, setDateSession] = useState<Dayjs | null>(dayjs());
  const [comment, setComment] = useState("");
  const [studentName, setStudentName] = useState<StudentUser | null>(null);

  const {
    setErrMsg,
    allCourse,
    getAllCourse,

    postComment,
    errMsg,
  } = useAddComment(courseName, studentName, comment);

  useEffect(() => {
    setErrMsg("");
  }, [comment, courseName, setErrMsg, studentName]);

  useEffect(() => {
    getAllCourse();
    // eslint-disable-next-line
  }, []);

  const defaultProps1 = {
    options: allCourse,
    getOptionLabel: (option: Course) => option.courseName,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // postComment();
    console.log(
      dateSession?.toISOString(),
      courseName?.courseName,
      participation,
      presence,
      homework,
      significantProblem,
      comment
    );
  };

  const { state, pathname } = useLocation();

  if (!state) {
    //if add url in address bar(not push the button) so you don't have state
    //return to the student detail
    return <Navigate to={pathname.slice(0, -12)} />;
  }
  const { student } = state as any;

  return (
    <Container>
      <FormBox component="form" onSubmit={handleSubmit}>
        <SelectBox>
          <Typography variant="h4" gutterBottom>
            ثبت گزارش برای {student.firstName} {student.lastName}
          </Typography>
        </SelectBox>
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
              setCourseName(newValue);
            }}
          />
        </SelectBox>
        <SelectBox>
          <Typography variant="body2" gutterBottom>
            تاریخ جلسه
          </Typography>
          <DatePicker
            setDateSession={setDateSession}
            dateSession={dateSession}
          />
        </SelectBox>
        <Commenting
          allChoice={allPresence}
          description="آیا مهارت آموز در جلسه حاضر بود؟"
          handleChange={setPresence}
          id="presence"
          value={presence}
        />
        <Commenting
          allChoice={allParticipation}
          description="میزان مشارکت مهارت‌آموز در جلسه را چطور ارزیابی می‌کنید؟"
          handleChange={setParticipation}
          id="participation"
          value={participation}
        />
        <Commenting
          allChoice={allHomework}
          description="در صورتی که تکلیف (یا هر اقدام پیشنهادی) 
            برای مهارت‌آموز در نظر گرفته شده بود، لطفا یکی از گزینه‌های زیر را انتخاب کنید."
          handleChange={setHomework}
          id="homework"
          value={homework}
        />
        <Commenting
          allChoice={allSignificantProblem}
          description="آیا مشکل قابل توجهی در جلسه وجود داشت؟"
          handleChange={setSignificantProblem}
          id="significantProblem"
          value={significantProblem}
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
            // disabled={!comment || !studentName || !courseName ? true : false}
          >
            ارسال
          </Button>
          <FormHelperText error>
            <Typography variant="caption">{errMsg ? errMsg : " "}</Typography>
          </FormHelperText>
        </SelectBox>
      </FormBox>
    </Container>
  );
};

export default AddComment;
