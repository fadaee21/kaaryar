import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../../api/axios";

export const useGetStudentList = (paginationState: number) => {
  //TODO:it would be better to have all user in one request and paginate it in front
  const allStudentsLink = `/ta/user/all?pageNum=${paginationState}&pageSize=20`;

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const getListStudent = async () => {
    try {
      let response = await getData(allStudentsLink);
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      //TODO:handle Error
      console.log("catch block of error");
      console.log(error);
      navigate("/");
    }
  };
  return { getListStudent, students, loading };
};
