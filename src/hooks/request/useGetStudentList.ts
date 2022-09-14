import { useState } from "react";
import { getData } from "../../api/axios";
import { useAuth } from "../../context/AuthProvider";


export const useGetStudentList = (paginationState: number) => {
  //TODO:it would be better to have all user in one request and paginate it in front
  const allStudentsLink = `/ta/user/all?pageNum=${paginationState}&pageSize=20`;
  const { auth } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const getListStudent = async () => {
    try {
      let response = await getData(allStudentsLink, {
        headers: {
          Authorization: auth!.token,
        },
      });
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      //TODO:handle Error
      console.log("catch block of error");
      console.log(error);
    }
  };
  return { getListStudent, students, loading };
};
