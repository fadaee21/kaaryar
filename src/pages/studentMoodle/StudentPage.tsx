import React, { useEffect, useState } from "react";
import { getData } from "../../api/axios";
import StudentDetail from "../../components/StudentDetail";
import { useNavigate, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress";
import { MoodleUser } from "../../model";

const StudentPage
 = () => {
  const [student, setStudent] = useState<MoodleUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const studentId = `/moodle/user/${id}`;

  const getStudent = async () => {
    setLoading(true);
    try {
      let response = await getData(studentId);
      setStudent(response.data);
      setLoading(false);
    } catch (error) {
      //TODO:handle Error
      console.log("catch block of error");
      console.log(error);
      setLoading(false);
      navigate("/");
    }
  };

  useEffect(() => {
    getStudent();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <LoadingProgress />;
  }

  return <StudentDetail student={student} />;
};

export default StudentPage
;
