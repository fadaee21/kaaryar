import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData, postData } from "../../api/axios";
import { useAuth } from "../../context/AuthProvider";
import { Course, StudentUser } from "../../model";

const allCourseLink = "/ta/course/all?pageNum=0&pageSize=100";
const allStudentLink = "/ta/user/all?pageNum=0&pageSize=400";
const postCommentLink = "/ta/survey/new";

export const useAddComment = (
  courseName: Course | null,
  studentName: StudentUser | null,
  comment: string
) => {
  const [allCourse, setAllCourse] = useState([]);
  const [allStudent, setAllStudent] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const { auth } = useAuth();
  const navigate = useNavigate();

  const getAllCourse = async () => {
    const response = await getData(allCourseLink, {
      headers: {
        Authorization: auth!.token,
      },
    });
    setAllCourse(response.data);
    console.log(response.data);
  };
  const getAllStudent = async () => {
    const response = await getData(allStudentLink, {
      headers: {
        Authorization: auth!.token,
      },
    });
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
        headers: {
          Authorization: auth!.token,
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
