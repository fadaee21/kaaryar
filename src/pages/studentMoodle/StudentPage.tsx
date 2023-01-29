import React, { useEffect, useState } from "react";
import { getData } from "../../api/axios";
import StudentDetail from "../../components/student/StudentDetail";
import { useNavigate, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress";
import { MoodleUser } from "../../model";
import StudentDetailMore from "../../components/student/StudentDetailMore";
import { Container, Divider } from "@mui/material";

const StudentPage = () => {
  const [student, setStudent] = useState<MoodleUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [studentDetail, setStudentDetail] = useState<any | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const studentId = `/moodle/user/${id}`;
  const studentIdDetail = `/moodle/user/detail/${id}`;
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
  const getStudentMoreDetail = async () => {
    setLoadingDetail(true);
    try {
      let response = await getData(studentIdDetail);
      setStudentDetail(response.data);
      setLoadingDetail(false);
    } catch (error) {
      //TODO:handle Error
      console.log("catch block of error");
      console.log(error);
      setLoadingDetail(false);
      navigate("/");
    }
  };

  useEffect(() => {
    getStudent();
    getStudentMoreDetail();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);

  if (loading || loadingDetail) {
    return <LoadingProgress />;
  }

  return (
    <Container maxWidth="lg">
      <StudentDetail student={student} />
      <Divider variant="middle" />
      <StudentDetailMore studentDetail={studentDetail} />
    </Container>
  );
};

export default StudentPage;
