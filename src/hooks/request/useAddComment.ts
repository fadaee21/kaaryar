import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData, postData, editAxios } from "../../api/axios";
import { useAuth } from "../../context/AuthProvider";
import { Course, StudentId, StudentUser } from "../../model";

export const useAddComment = (
  course: Course | null,
  studentId: StudentId | null,
  comment: string,
  sessionDate: string,
  sessionProblem: string,
  studentTask: string,
  studentContribute: string,
  studentPresent: string
) => {
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const { auth } = useAuth();
  const roles = auth.roles.toString();
  const [allCourse, setAllCourse] = useState([]);

  const postCommentLink = `/${roles}/survey/new`;
  const allCourseLink = `/${roles}/course/all?pageNum=0&pageSize=100`;

  // there is a problem for selecting null as value, handle by this function
  const StPresentBoolean = () => {
    switch (studentPresent) {
      case "بله":
        return true;
      case "خیر":
        return false;
      default:
        return null;
    }
  };

  const getAllCourse = useCallback(async () => {
    try {
      const response = await getData(allCourseLink);
      setAllCourse(response.data);
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  }, []);
  useEffect(() => {
    getAllCourse();
  }, [getAllCourse]);

  // console.log(
  //   "studentUser:",
  //   studentId,
  //   "course:",
  //   course,
  //   "comment:",
  //   comment,
  //   "sessionDate:",
  //   sessionDate,
  //   "studentContribute:",
  //   studentContribute,
  //   "studentTask:",
  //   studentTask,
  //   "sessionProblem:",
  //   sessionProblem,
  //   "studentPresent:",
  //   StPresentBoolean()
  // );
  const postComment = async () => {
    try {
      const response = await postData(postCommentLink, {
        data: {
          studentUser: studentId,
          course: course,
          comment: comment,
          sessionDate: sessionDate,
          studentContribute: studentContribute,
          studentTask: studentTask,
          sessionProblem: sessionProblem,
          studentPresent: StPresentBoolean(),
        },
      });
      console.log(response);
      if (response.data.state === "exist") {
        setErrMsg("این نظر قبلا ثبت شده است");
      }
      if (response.data.state === "success") {
        navigate(`/${roles}/all-comments`);
      }
      setErrMsg(" نظر شما ثبت نشد");
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
      if (err.response?.status === 401) {
        setErrMsg("شما مجاز به ثبت  نظر نمی باشید");
      }
      if (err.response?.status === 403) {
        setErrMsg("امکان ثبت  نظر شما نیست");
      }
      setErrMsg(" نظر شما ثبت نشد");
    }
  };

  const putComment = async (
    id: number | undefined,
    studentUser: StudentUser | undefined
  ) => {
    console.log(
      "course:",
      course,
      "studentUser:",
      studentUser,
      "comment:",
      comment,
      "sessionDate:",
      sessionDate,
      "sessionProblem:",
      sessionProblem,
      "studentTask:",
      studentTask,
      "studentContribute:",
      studentContribute,
      "studentPresent:",
      studentPresent
    );
    try {
      const response = await editAxios(`${roles}/survey/${id}`, {
        data: {
          studentUser: studentUser,
          course: course,
          comment: comment,
          sessionDate: sessionDate,
          studentContribute: studentContribute,
          studentTask: studentTask,
          sessionProblem: sessionProblem,
          studentPresent: StPresentBoolean(),
        },
      });
      const data = await response.data;
      console.log(data);
      if (response.data.state === "exist") {
        setErrMsg("این نظر قبلا ثبت شده است");
      }
      if (response.data.state === "success") {
        navigate(`/${roles}/all-comments`);
      }
      setErrMsg(" نظر شما ثبت نشد");
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
      if (err.response?.status === 401) {
        setErrMsg("شما مجاز به ثبت  نظر نمی باشید");
      }
      if (err.response?.status === 403) {
        setErrMsg("امکان ثبت  نظر شما نیست");
      }
      setErrMsg(" نظر شما ثبت نشد");
    }
  };

  return {
    setErrMsg,
    allCourse,
    postComment,
    putComment,
    errMsg,
  };
};
