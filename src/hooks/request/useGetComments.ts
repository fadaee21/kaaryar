import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../../api/axios";
import useLocalStorage from "../useLocalStorage";

export const useGetComments = (page: number) => {
  const [storedValue, setValue] = useLocalStorage("user", null);
  const [roles] = storedValue.roles;
  const allCommentLink = `${roles}/survey/all?pageNum=${page - 1}&pageSize=10`;
  const countComment = `/${roles}/survey/count`;
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentCounter, setCommentCounter] = useState<string>("0");
  const navigate = useNavigate();
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

  const getListLearner = async () => {
    try {
      let response = await getData(allCommentLink);
      setComments(response.data);
      setLoading(false);
    } catch (error) {
      //TODO:handle Error
      console.log("catch block of error");
      console.log(error);
      navigate("/");
    }
  };

  return { getListLearner, comments, loading, commentCounter };
};
