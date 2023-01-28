import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../../api/axios";

const useMoodleAssignee = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  // const allStudentMoodle = `moodle/user/all?pageNum=${page - 1}&pageSize=60`;
  const allStudentMoodle = "/moodle/user/assignee";

  const getListAssignee = async () => {
    setLoading(true);
    try {
      let response = await getData(allStudentMoodle);
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      //TODO:handle Error
      console.log("catch block of error");
      console.log(error);
      setLoading(false);
      navigate("/");
    }
  };

  return { students, loading, getListAssignee };
};

export default useMoodleAssignee;
