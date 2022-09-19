import { useState } from "react";
import { editComment } from "../../api/axios";
import { useAuth } from "../../context/AuthProvider";

export const useEditComment = (comment: string, id: number) => {
  const { auth } = useAuth();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const editCommentFunc = async () => {
    setLoading(true);
    setSuccess(false);
    try {
      await editComment(`ta/survey/${id}`, {
        data: {
          comment,
        },
        headers: {
          Authorization: auth!.token,
        },
      });
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setErrorMsg("ویرایش انجام نشد");
      setLoading(false);
      setSuccess(false);
    }
  };

  return { editCommentFunc, errorMsg, success, loading };
};
