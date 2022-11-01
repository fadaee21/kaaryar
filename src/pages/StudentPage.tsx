import React, { useEffect, useState } from "react";
import { getData } from "../api/axios";
import StudentDetail from "../components/StudentDetail";
import { useAuth } from "../context/AuthProvider";
import { useParams } from "react-router-dom";
import LoadingProgress from "../components/LoadingProgress";
import { MoodleUser } from "../model";

const StudentPage = () => {
    const [student, setStudent] = useState<MoodleUser|null>(null)
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    console.log(id);
    const studentId = `/moodle/user/${id}`;
    const { auth } = useAuth();
  
    const getStudent = async () => {
      try {
        let response = await getData(studentId, {
          headers: {
            Authorization: auth!.token,
          },
        });
        setStudent(response.data);
        setLoading(false);
      } catch (error) {
        //TODO:handle Error
        console.log("catch block of error");
        console.log(error);
        setLoading(false);
      }
    };
  
    useEffect(() => {
      getStudent();
      window.scrollTo(0, 0);
    }, []);
  
    if (loading) {
      return <LoadingProgress />;
    }


  return <StudentDetail student={student} />;
};

export default StudentPage;
