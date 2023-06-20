import { useEffect, useState } from "react";
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

  useEffect(() => {

    const studentId = `/moodle/user/${id}`;
    const studentIdDetail = `/moodle/user/detail/${id}`;
    const afterBeforeInfo = `/exam/after/week/form/moodle/${id}`;
    let mounted = true;
    const getStudentAfterDetail = async () => {
      setLoadingAfter(true);
      try {
        let response = await getData(afterBeforeInfo);
        if (response.status === 200 && mounted) {
          setAfterInfo(response.data);
        }
        console.log(response);
      } catch (error: any) {
        //TODO:handle Error
        if (error.response.status === 404) {
          console.log("no moodle information for this student");
        } else {
          console.log(error);
        }
      }
      setLoadingAfter(false);
    };

    const getStudent = async () => {
      setLoading(true);
      try {
        let response = await getData(studentId);
        if (response.status === 200 && mounted) {
          setStudent(response.data);
        }
      } catch (error: any) {
        //TODO:handle Error

        console.log(error);
        navigate("/");
      }
      setLoading(false);
    };
    
    const getStudentMoreDetail = async () => {
      setLoadingDetail(true);
      try {
        let response = await getData(studentIdDetail);
        if (response.status === 200 && mounted) {
          setStudentDetail(response.data);
        }
      } catch (error: any) {
        //TODO:handle Error
        if (error.response.status === 404) {
          console.log("no information for this student");
        } else {
          console.log(error);
        }
      }
      setLoadingDetail(false);
    };
    getStudent();
    getStudentMoreDetail();
    getStudentAfterDetail();
    window.scrollTo(0, 0);
  }, [id, navigate]);

  const matches = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));

  return (
    <Container maxWidth="lg">
      {!loading && student ? (
        <StudentDetail student={student} />
      ) : (
        <LoadingProgress />
      )}
      {!loadingDetail && studentDetail && (
        <>
          <Divider variant="middle" sx={{ my: 8 }} />
          <StudentDetailMore studentDetail={studentDetail} />
        </>
      )}
      {!loadingAfter && afterInfo && (
        <>
          <Divider variant="middle" sx={{ my: 8 }} />
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
