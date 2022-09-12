import { useState } from "react";
import { getData } from "../api/axios";
import { useAuth } from "../context/AuthProvider";

export const useGetComments = () => {
  //TODO:it would be better to have all user in one request and paginate it in front
  const allCommentLink = `ta/survey/all?pageNum=0&pageSize=2`;
  const { auth } = useAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const getListLearner = async () => {
    try {
      let response = await getData(allCommentLink, {
        headers: {
          Authorization: auth!.token,
        },
      });
      setComments(response.data);
      setLoading(false);
    } catch (error) {
      //TODO:handle Error
      console.log("catch block of error");
      console.log(error);
    }
  };
  return { getListLearner, comments, loading };
};
