import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getData } from "../../api/axios";
import { useAuth } from "../../context/AuthProvider";

export const useGetComments = (page: number) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentCounter, setCommentCounter] = useState<string>("0");
  const navigate = useNavigate();

  const { auth } = useAuth();
  const {roleQuery} = useParams()
  const roles = auth.roles.toString();


  useEffect(() => {
    const getCountComment = async () => {
      try {
        const countComment = `/${roleQuery}/survey/count`;
        let { data } = await getData(countComment);
        setCommentCounter(data.message);
      } catch (error) {
        console.log("comment Counter", error);
        navigate(`/${roles}/all-comments`);
      }
    };
    getCountComment();
  }, []);

  const getListComments = async () => {
    try {
      const allCommentLink = `${roleQuery}/survey/all?pageNum=${
        page - 1
      }&pageSize=10`;
      let response = await getData(allCommentLink);
      setComments(response.data);
      setLoading(false);
    } catch (error) {
      //TODO:handle Error
      console.log("catch block of error");
      console.log(error);
    }
  };

  return { getListComments, comments, loading, commentCounter };
};
