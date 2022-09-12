import { useState } from "react";
import { getData } from "../api/axios";
import { useAuth } from "../context/AuthProvider";

export const useGetLearnerList = (paginationState: number) => {
  //TODO:it would be better to have all user in one request and paginate it in front
  const learnerLink = `/ta/user/all?pageNum=${paginationState}&pageSize=20`;
  const { auth } = useAuth();
  const [learners, setLearners] = useState([]);
  const [loading, setLoading] = useState(true);

  const getListLearner = async () => {
    try {
      let response = await getData(learnerLink, {
        headers: {
          Authorization: auth!.token,
        },
      });
      setLearners(response.data);
      setLoading(false);
    } catch (error) {
      //TODO:handle Error
      console.log("catch block of error");
      console.log(error);
    }
  };
  return { getListLearner, learners, loading };
};
