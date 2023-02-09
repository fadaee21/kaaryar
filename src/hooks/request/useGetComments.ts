import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../../api/axios";
import { useAuth } from "../../context/AuthProvider";
import { CommentTable } from "../../model";

export const useGetComments = (page: number, pageSize: number) => {
  const [commentsTable, setCommentsTable] = useState<CommentTable[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [commentCounter, setCommentCounter] = useState<string>("0");
  const navigate = useNavigate();

  const { auth } = useAuth();
  const roles = auth.roles.toString();
  const countComment =
    roles === "admin" ? "/total/count" : `/${roles}/survey/count`;
  const allCommentLink =
    roles === "admin"
      ? `total/all?pageNum=${page - 1}&pageSize=${pageSize}`
      : `${roles}/survey/all?pageNum=${page - 1}&pageSize=${pageSize}`;

  useEffect(() => {
    const getCountComment = async () => {
      try {
        let { data } = await getData(countComment);
        setCommentCounter(data.message);
      } catch (error) {
        console.log("comment Counter", error);
      }
    };
    getCountComment();
  }, []);

  const getListComments = async () => {
    try {
      let response = await getData(allCommentLink);
      let data = await response.data;
      setCommentsTable(data);
      setLoading(false);
    } catch (error) {
      //TODO:handle Error
      console.log("catch block of error");
      console.log(error);
      navigate("/");
    }
  };

  return { getListComments, commentsTable, loading, commentCounter };
};
