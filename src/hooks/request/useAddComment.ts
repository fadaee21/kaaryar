import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData, postData } from "../../api/axios";
import { Course, StudentUser } from "../../model";
import useLocalStorage from "../useLocalStorage";


export const useAddComment = (
  courseName: Course | null,
  studentName: StudentUser | null,
  comment: string
  ) => {
    const [allCourse, setAllCourse] = useState([]);
    const [allStudent, setAllStudent] = useState([]);
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();
    const [storedValue, setValue] = useLocalStorage("user", null);
    const roles = storedValue.roles

    const allCourseLink = `/${roles}/course/all?pageNum=0&pageSize=100`;
    const allStudentLink = `/${roles}/user/all?pageNum=0&pageSize=400`;
    const postCommentLink = `/${roles}/survey/new`;

  const getAllCourse = async () => {
    try {
      const response = await getData(allCourseLink);
      setAllCourse(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };
  const getAllStudent = async () => {
    const response = await getData(allStudentLink);
    setAllStudent(response.data);
  };

  const postComment = async () => {
    try {
      const response = await postData(postCommentLink, {
        data: {
          comment: comment,
          studentUser: studentName,
          course: courseName,
        },
      });

      if (response.data.state === "exist") {
        setErrMsg("این نظر قبلا ثبت شده است");
      }
      if (response.data.state === "success") {
        navigate(-1);
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 401) {
        setErrMsg("شما مجاز به ثبت  نظر نمی باشید");
      }
      if (err.response?.status === 403) {
        setErrMsg("امکان ثبت نظر نیست");
      }
      setErrMsg("نظر ثبت نشد");
    }
  };
  return {
    setErrMsg,
    allCourse,
    getAllCourse,
    allStudent,
    getAllStudent,
    postComment,
    errMsg,
  };
};
