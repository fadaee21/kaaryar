import { useState } from "react";
import { editComment } from "../../api/axios";
import { useAuth } from "../../context/AuthProvider";

export const useEditComment = (comment: string, id: number) => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const editCommentFunc = async () => {
    setLoading(true);
    try {
      await editComment(`ta/survey/${id}`, {
        data: {
          comment,
        },
        headers: {
          Authorization: auth!.token,
        },
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setErrorMsg("ویرایش انجام نشد");
      setLoading(false);
    }
  };

  return { editCommentFunc, errorMsg, loading };
};
