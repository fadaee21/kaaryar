import { removeData } from "../../api/axios";
import { useAuth } from "../../context/AuthProvider";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";

export const useDeleteComment = (idComment: number | undefined) => {
  const { auth } = useAuth();
  const roles = auth.roles.toString();

  const removeComment = async () => {
    try {
      await removeData(`/${roles}/survey/${idComment}`);
      toast.success("نظر شما با موفقیت حذف شد");
    } catch (error: any) {
      toast.error(handleError(error));
    }
  };

  return {
    removeComment,
  };
};
