import { useState } from "react";
import { AxiosError } from "axios";
import { removeData } from "../../api/axios";
export const useDeleteComment = (idComment: number | undefined) => {
  const [refresh, setRefresh] = useState(false);
  const [errRemoveMsg, setErrRemoveMsg] = useState("");
  const [successRemoveMsg, setSuccessRemoveMsg] = useState("");

  const removeComment = async () => {
    console.log(idComment);
    try {
      await removeData(`/ta/survey/${idComment}`);
      setRefresh(!refresh);
      setSuccessRemoveMsg("نظر با موفقیت حذف شد");
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 401) {
        setErrRemoveMsg("شما مجاز به حذف این نظر نمی باشید");
      }
      if (err.response?.status === 403) {
        setErrRemoveMsg("امکان حذف این پیام نیست");
      }
      setErrRemoveMsg("نظر حذف نشد");
    }
  };

  return {
    removeComment,
    refresh,
    errRemoveMsg,
    setErrRemoveMsg,
    successRemoveMsg,
    setSuccessRemoveMsg,
  };
};
