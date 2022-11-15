import React, { useEffect, useState } from "react";
import { getData, postData } from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import LoadingProgress from "../components/LoadingProgress";
import { ExamRegisterUser } from "../model";
import { Box, Button, Container, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExamFormDetailComp from "../components/ExamFormDetailComp";
import ExamFormDetailEditComp from "../components/ExamFormDetailEditComp";

const ExamFormDetailEdit = () => {
  const [student, setStudent] = useState<ExamRegisterUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const studentId = `/exam/form/${id}`;

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
  //   const editStudent = async () => {
  //     setLoading(true);
  //     try {
  //       let response = await postData(studentId);
  // ! you need new state for posting data
  //       setStudent(response.data);
  //       setLoading(false);
  //     } catch (error) {
  //       //TODO:handle Error
  //       console.log("catch block of error");
  //       console.log(error);
  //       setLoading(false);
  //       navigate("/");
  //     }
  //   };

  useEffect(() => {
    getStudent();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <LoadingProgress />;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          marginRight: 5,
        }}
      >
        <Button
          variant="contained"
          endIcon={<ArrowBackIcon />}
          color="secondary"
          size="small"
          onClick={() => navigate(-1)}
        >
          بازگشت
        </Button>
      </Box>
      <Container maxWidth="lg">
        <ExamFormDetailComp student={student} />
        <Divider />
        <ExamFormDetailEditComp student={student} />
      </Container>
    </>
  );
};

export default ExamFormDetailEdit;
