import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../../api/axios";

export const useGetComments = (page: number) => {
  const allCommentLink = `ta/survey/all?pageNum=${page}&pageSize=10`;
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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
  return { getListLearner, comments, loading };
};
