// import { Autocomplete, Button, FormHelperText, TextField, Typography } from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers";
// import dayjs from "dayjs";
// import React, { useEffect, useState } from "react";
// import { Comment, Course } from "../../model";
// import { FormBox, SelectBox } from "../../styles/addComment/formBox";
// import Commenting from "./Commenting";
// import { allHomework, allParticipation, allPresence, allSignificantProblem } from "./commentOptions";

// const EditCommentComp = ({ allComment }: { allComment: Comment | null }) => {

//   const [course, setCourse] = useState<Course | null>(null);
//   const [studentContribute, setStudentContribute] = useState("");
//   const [studentPresent, setStudentPresent] = useState("");
//   const [studentTask, setStudentTask] = useState("");
//   const [sessionProblem, setSessionProblem] = useState("");
//   const [sessionDate, setSessionDate] = useState<Dayjs | null>(dayjs());
//   const [comment, setComment] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // postComment();
//   };

//   useEffect(() => {
//     // setErrMsg("");
//   }, [comment, course, setErrMsg, studentId]);

//   const defaultProps1 = {
//     options: allCourse,
//     getOptionLabel: (option: Course) => option.courseName,
//   };

//   return (
//     <FormBox component="form" onSubmit={handleSubmit}>
//       <SelectBox>
//         <Typography variant="body2" gutterBottom>
//           نام دوره
//         </Typography>
//         <Autocomplete
//           {...defaultProps1}
//           disablePortal
//           id="course-name"
//           options={allCourse}
//           renderInput={(params) => <TextField {...params} />}
//           onChange={(event: any, newValue: Course | null) => {
//             setCourse(newValue);
//           }}
//         />
//       </SelectBox>
//       <SelectBox>
//         <Typography variant="body2" gutterBottom>
//           تاریخ جلسه
//         </Typography>
//         <DatePicker setSessionDate={setSessionDate} sessionDate={sessionDate} />
//       </SelectBox>
//       <Commenting
//         allChoice={allPresence}
//         description="آیا مهارت آموز در جلسه حاضر بود؟"
//         handleChange={setStudentPresent}
//         id="studentPresent"
//         value={studentPresent}
//       />
//       <Commenting
//         allChoice={allParticipation}
//         description="میزان مشارکت مهارت‌آموز در جلسه را چطور ارزیابی می‌کنید؟"
//         handleChange={setStudentContribute}
//         id="studentContribute"
//         value={studentContribute}
//       />
//       <Commenting
//         allChoice={allHomework}
//         description="در صورتی که تکلیف (یا هر اقدام پیشنهادی) 
//           برای مهارت‌آموز در نظر گرفته شده بود، لطفا یکی از گزینه‌های زیر را انتخاب کنید."
//         handleChange={setStudentTask}
//         id="studentTask"
//         value={studentTask}
//       />
//       <Commenting
//         allChoice={allSignificantProblem}
//         description="آیا مشکل قابل توجهی در جلسه وجود داشت؟"
//         handleChange={setSessionProblem}
//         id="sessionProblem"
//         value={sessionProblem}
//       />

//       <SelectBox>
//         <Typography variant="body2" gutterBottom>
//           لطفا گزارش کوتاهی از جلسه بنویسید
//           <Typography variant="caption">
//             (احساس خودتان، وضعیت مهارت آموز از نظر شما، تکالیف و پیشنهاداتی که
//             به مهارت آموز داده‌اید و غیره)
//           </Typography>
//         </Typography>
//         <TextField
//           fullWidth
//           id="outlined-multiline-static"
//           multiline
//           rows={4}
//           onChange={(e) => setComment(e.target.value)}
//           type="text"
//           autoComplete="off"
//         />
//       </SelectBox>
//       <SelectBox>
//         <Button
//           variant="contained"
//           type="submit"
//           disabled={
//             !course ||
//             !studentContribute ||
//             !studentPresent ||
//             !studentTask ||
//             !sessionProblem ||
//             !sessionDate ||
//             !comment
//           }
//         >
//           ارسال
//         </Button>
//         <FormHelperText error>
//           {/* <Typography variant="caption">{errMsg ? errMsg : " "}</Typography> */}
//         </FormHelperText>
//       </SelectBox>
//     </FormBox>
//   );
// };

// export default EditCommentComp;


import React from 'react'

const EditCommentComp = () => {
  return (
    <div>EditCommentComp</div>
  )
}

export default EditCommentComp