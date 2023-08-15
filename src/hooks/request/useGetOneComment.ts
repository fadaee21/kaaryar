import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { useAuth } from "../../context/AuthProvider";
import { Comment } from "../../model";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";
const useGetOneComment = () => {
  const { auth } = useAuth();
  const roles = auth.roles.toString();
  const { id } = useParams();
  const linkGetOne =
    roles === "admin" ? `total/survey/${id}` : `${roles}/survey/${id}`;
  const {
    data: allComment,
    error,
    isLoading: loading,
  } = useSWR<Comment>(linkGetOne);
  useEffect(() => {
    if (error) {
      toast.error(handleError(error));
    }
  }, [error]);
  return { allComment, loading };
};

export default useGetOneComment;
