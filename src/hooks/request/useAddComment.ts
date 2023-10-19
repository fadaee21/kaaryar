import { useNavigate, useParams } from "react-router-dom";
import { postData, editAxios } from "../../api/axios";
import { useAuth } from "../../context/AuthProvider";
import { ModulesAsStudentModule } from "../../model";
import useSWR from "swr";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";
import { useState } from "react";
export const useAddComment = (
  course: ModulesAsStudentModule | null,
  comment: string,
  sessionDate: string,
  sessionProblem: string,
  studentTask: string,
  studentContribution: string | null,
  studentPresent: string
) => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const roles = auth.roles.toString();
  const { id: studentId } = useParams();
  const postCommentLink = `/${roles}/survey/new`;
  const allCourseLink = `${roles}/modules/all?pageNum=1&pageSize=100&orderAscending=false&orderBy=name`;
  const [loading, setLoading] = useState(false);
  const {
    data: allCourse,
    error: errorAllCourse,
    isLoading: courseLoading,
  } = useSWR<ModulesAsStudentModule[]>(allCourseLink);
  if (errorAllCourse) {
    toast.error(handleError(errorAllCourse));
  }

  const postComment = async () => {
    setLoading(true);
    try {
      const response = await postData(postCommentLink, {
        data: {
          studentId,
          moduleId: course?.id,
          comment,
          sessionDate,
          studentContribution,
          studentTask,
          sessionProblem,
          studentPresent,
        },
      });
      if (response.status === 201) {
        navigate(`/${roles}/all-comments`);
        toast.success("نظر با موفقیت ثبت شد");
        return;
      }
      if (response.data.state === "exist") {
        toast.error("این نظر قبلا ثبت شده است");
        return;
      }
      toast.error(" نظر شما ثبت نشد");
    } catch (error: any) {
      toast.error(handleError(error));
    } finally {
      setLoading(false);
    }
  };

  const putComment = async (id: number | undefined) => {
    try {
      setLoading(true);
      const response = await editAxios(`${roles}/survey/${id}`, {
        data: {
          studentId,
          moduleId: course?.id,
          comment,
          sessionDate,
          studentContribution,
          studentTask,
          sessionProblem,
          studentPresent,
        },
      });

      if (response.status === 200) {
        navigate(`/${roles}/all-comments`);
        toast.success("نظر شما با موفقیت ویرایش شد");
        return;
      }
      if (response.data.state === "exist") {
        toast.error("این نظر قبلا ثبت شده است");
        return;
      }
      toast.error(" نظر شما ویرایش نشد");
    } catch (error: any) {
      toast.error(handleError(error));
    } finally {
      setLoading(false);
    }
  };
  return {
    courseLoading,
    allCourse,
    postComment,
    putComment,
    loading,
  };
};
