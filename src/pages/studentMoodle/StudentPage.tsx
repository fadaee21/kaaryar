import React, { useEffect, useState } from "react";
import { getData } from "../../api/axios";
import StudentDetail from "../../components/student/StudentDetail";
import { useNavigate, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress";
import { AfterWeekType, MoodleUser } from "../../model";
import StudentDetailMore from "../../components/student/StudentDetailMore";
import { Container, Divider, useMediaQuery } from "@mui/material";

import BeforeWeekDetailShowComp from "../../components/beforeWeek/BeforeWeekDetailShowComp";
import AfterWeekDetailShowComp from "../../components/afterWeek/AfterWeekDetailShowComp";
import RegisterFormDetailComp from "../../components/RegisterFormDetail/RegisterFormDetailComp";

const StudentPage = () => {
  const [student, setStudent] = useState<MoodleUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [studentDetail, setStudentDetail] = useState<any | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(true);
  const [afterInfo, setAfterInfo] = useState<AfterWeekType | null>(null);
  const [loadingAfter, setLoadingAfter] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const studentId = `/moodle/user/${id}`;
  const studentIdDetail = `/moodle/user/detail/${id}`;
  const afterBeforeInfo = `/exam/after/week/form/moodle/${id}`;
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
  const getStudentAfterDetail = async () => {
    setLoadingAfter(true);
    try {
      let response = await getData(afterBeforeInfo);
      setAfterInfo(response.data);
      setLoadingAfter(false);
    } catch (error) {
      //TODO:handle Error
      console.log("catch block of error");
      console.log(error);
      setLoadingAfter(false);
      navigate("/");
    }
  };

  useEffect(() => {
    getStudent();
    getStudentMoreDetail();
    getStudentAfterDetail();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);
  const matches = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));

  if (loading || loadingDetail || loadingAfter) {
    return <LoadingProgress />;
  }

  return (
    <Container maxWidth="lg">
      <StudentDetail student={student} />
      <Divider variant="middle" />
      <StudentDetailMore studentDetail={studentDetail} />
      {afterInfo && (
        <>
          <Divider variant="middle" />
          <RegisterFormDetailComp
            student={afterInfo?.beforeWeekForm?.registrationForm}
          />
          <Divider />
          <BeforeWeekDetailShowComp
            typeComp="admission"
            student={afterInfo?.beforeWeekForm}
            matches={matches}
            id={id}
          />
          <Divider />
          <AfterWeekDetailShowComp
            typeComp="admission"
            student={afterInfo}
            matches={matches}
            id={id}
          />
        </>
      )}
    </Container>
  );
};

export default StudentPage;
