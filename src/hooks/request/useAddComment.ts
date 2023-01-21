import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData, postData } from "../../api/axios";
import { useAuth } from "../../context/AuthProvider";
import { Course, StudentId } from "../../model";

export const useAddComment = (
  course: Course | null,
  studentId: StudentId | null,
  comment: string,
  sessionDate: string,
  sessionProblem: string,
  studentTask: string,
  studentContribute: string,
  //it should be string or boolean?? ask alireza
  studentPresent: boolean | string
) => {
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const { auth } = useAuth();
  const roles = auth.roles.toString();
  const [allCourse, setAllCourse] = useState([]);

  const postCommentLink = `/${roles}/survey/new`;
  const allCourseLink = `/${roles}/course/all?pageNum=0&pageSize=100`;

  console.log(
    "studentUser:",
    studentId,
    "course:",
    course,
    "comment:",
    comment,
    "sessionDate:",
    sessionDate,
    "studentContribute:",
    studentContribute,
    "studentTask:",
    studentTask,
    "sessionProblem:",
    sessionProblem,
    "studentPresent:",
    studentPresent
  );

  const getAllCourse = async () => {
    try {
      const response = await getData(allCourseLink);
      setAllCourse(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };

  useEffect(() => {
    getAllCourse();
    // eslint-disable-next-line
  }, []);

  const postComment = async () => {
    // try {
    //   const response = await postData(postCommentLink, {
    //     data: {
    //       studentUser: studentId,
    //       course: course,
    //       comment: comment,
    //       sessionDate: sessionDate,
    //       studentContribute: studentContribute,
    //       studentTask: studentTask,
    //       sessionProblem: sessionProblem,
    //       studentPresent: studentPresent,
    //     },
    //   });
    //   console.log(response.data.state);
    //   if (response.data.state === "exist") {
    //     setErrMsg("این نظر قبلا ثبت شده است");
    //   }
    //   if (response.data.state === "success") {
    //     navigate(-1);
    //   }
    // } catch (error) {
    //   const err = error as AxiosError;
    //   if (err.response?.status === 401) {
    //     setErrMsg("شما مجاز به ثبت  نظر نمی باشید");
    //   }
    //   if (err.response?.status === 403) {
    //     setErrMsg("امکان ثبت نظر نیست");
    //   }
    //   setErrMsg("نظر ثبت نشد");
    // }
  };
  return {
    setErrMsg,
    allCourse,
    postComment,
    errMsg,
  };
};
