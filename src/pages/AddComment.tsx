import {
  Autocomplete,
  Button,
  Container,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAddComment } from "../hooks/request/useAddComment";

import { Course, StudentUser } from "../model";
import { FormBox, FormBoxSection } from "../styles/addComment/formBox";

const AddComment = () => {
  const [courseName, setCourseName] = useState<Course | null>(null);
  const [studentName, setStudentName] = useState<StudentUser | null>(null);
  const [comment, setComment] = useState("");

  const {
    setErrMsg,
    allCourse,
    getAllCourse,
    allStudent,
    getAllStudent,
    postComment,
    errMsg,
  } = useAddComment(courseName, studentName, comment);

  useEffect(() => {
    setErrMsg("");
  }, [comment, courseName, setErrMsg, studentName]);

  useEffect(() => {
    getAllCourse();
    getAllStudent();
    // eslint-disable-next-line
  }, []);

  const defaultProps1 = {
    options: allCourse,
    getOptionLabel: (option: Course) => option.courseName,
  };

  const defaultProps2 = {
    options: allStudent,

    getOptionLabel: (option: StudentUser) =>
      option.id + "-" + option.firstName + " " + option.lastName,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postComment();
  };

  return (
    <Container>
      <FormBoxSection component={"section"}>
        <FormBox component="form" onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom>
            ثبت نظر
          </Typography>
          <Autocomplete
            {...defaultProps1}
            disablePortal
            id="course-name"
            options={allCourse}
            renderInput={(params) => <TextField {...params} label="نام دوره" />}
            onChange={(event: any, newValue: Course | null) => {
              setCourseName(newValue);
            }}
          />

          <Autocomplete
            {...defaultProps2}
            disablePortal
            id="student-name"
            options={allStudent}
            renderInput={(params) => (
              <TextField {...params} label="نام دانشجو" />
            )}
            onChange={(event: any, newValue: StudentUser | null) => {
              setStudentName(newValue);
            }}
          />

          <TextField
            id="outlined-multiline-static"
            label="ثبت نظر"
            multiline
            rows={4}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            autoComplete="off"
          />
          <Button
            variant="contained"
            type="submit"
            disabled={!comment || !studentName || !courseName ? true : false}
          >
            ارسال
          </Button>
          <FormHelperText error>
            <Typography variant="body1">{errMsg ? errMsg : " "}</Typography>
          </FormHelperText>
        </FormBox>
      </FormBoxSection>
    </Container>
  );
};

export default AddComment;
