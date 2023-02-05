import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../../api/axios";
import { useAuth } from "../../context/AuthProvider";
import { CommentTable } from "../../model";

export const useGetComments = (page: number) => {
  const [commentsTable, setCommentsTable] = useState<CommentTable[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [commentCounter, setCommentCounter] = useState<string>("0");
  const navigate = useNavigate();

  const { auth } = useAuth();
  const roles = auth.roles.toString();

  useEffect(() => {
    const getCountComment = async () => {
      if (roles === "admin") {
        //waiting for creating API
        return;
      }
      try {
        const countComment = `/${roles}/survey/count`;
        let { data } = await getData(countComment);
        setCommentCounter(data.message);
        console.log("تعداد کامنت ها: ", data.message);
      } catch (error) {
        console.log("comment Counter", error);
        navigate(`/${roles}/all-comments`);
      }
    };
    getCountComment();
  }, []);

  const getListComments = async () => {
    try {
      const allCommentLink =
        roles === "admin"
          ? `total/all?pageNum=${page - 1}&pageSize=10`
          : `${roles}/survey/all?pageNum=${page - 1}&pageSize=10`;
      let response = await getData(allCommentLink);
      setCommentsTable(response.data);
      setLoading(false);
    } catch (error) {
      //TODO:handle Error
      console.log("catch block of error");
      console.log(error);
    }
  };

  return { getListComments, commentsTable, loading, commentCounter };
};
