import useSWR from "swr";
import { useAuth } from "../../context/AuthProvider";
import { Comment } from "../../model";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";
import { useNavigate } from "react-router-dom";

export const useGetComments = (page: number, pageSize: number) => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const roles = auth.roles.toString();
  const countComment =
    roles === "admin" ? "/total/count" : `/${roles}/survey/count`;
  const allCommentLink =
    roles === "admin"
      ? `total/all?pageNum=${page}&pageSize=${pageSize}`
      : `${roles}/survey/all?pageNum=${page}&pageSize=${pageSize}`;

  const { data: commentCounter } = useSWR<{count:number}>(countComment);

  const {
    data: commentsTable,
    isLoading: commentsTableLoading,
    error,
    mutate: refreshData,
  } = useSWR<Comment[]>(allCommentLink);
  if (error) {
    toast.error(handleError(error));
    navigate("/");
  }

  return { commentsTable, refreshData, commentsTableLoading, commentCounter };
};
