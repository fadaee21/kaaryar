import React, { useEffect, useState } from "react";
import { editAxios, getData } from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import LoadingProgress from "../components/LoadingProgress";
import { ExamRegisterUser } from "../model";
import { Box, Button, Container, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExamFormDetailComp from "../components/ExamFormDetail/ExamFormDetailComp";
import ExamFormDetailEditComp1 from "../components/ExamFormDetail/ExamFormDetailEditComp1";
import ExamFormDetailEditComp2 from "../components/ExamFormDetail/ExamFormDetailEditComp2";

const ExamFormDetailEdit = () => {
  const [student, setStudent] = useState<ExamRegisterUser | null>(null);
  const [loadingGet, setLoadingGet] = useState(true);
  const [loadingPut, setLoadingPut] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const studentId = `/exam/form/${id}`;

  const getStudent = async () => {
    setLoadingGet(true);
    try {
      let response = await getData(studentId);
      setStudent(response.data);
      setLoadingGet(false);
    } catch (error) {
      //TODO:handle Error
      console.log("catch block of error");
      console.log(error);
      setLoadingGet(false);
      navigate("/");
    }
  };

  const handleClick = async (e: React.FormEvent) => {
    setLoadingPut(true);
    e.preventDefault();
    try {
      const response = await editAxios(`/exam/form/${id}`, {
        data: student,
      });
      if (response.status === 200) {
        // navigate(-1);
        console.log(response.data);
      } else {
        console.log(response.data);
      }
      setLoadingPut(false);
    } catch (error) {
      console.log(error);
      setLoadingPut(false);
    }
  };

  const handleChange = (e: any) => {
    // console.log(student)
    const { name, value } = e.target;
    setStudent((prev: any) => ({ ...prev, [name]: value }));
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

  if (loadingGet) {
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
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ width: "100%" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-start",
              marginRight: 5,
            }}
          >
            <Button
              onClick={handleClick}
              variant="contained"
              type="submit"
              disabled={loadingPut ? true : false}
              sx={{ my: 3 }}
            >
              ذخیره اطلاعات
            </Button>
          </Box>
          <ExamFormDetailEditComp1
            student={student}
            handleChange={handleChange}
          />
          <ExamFormDetailEditComp2
            student={student}
            handleChange={handleChange}
          />
        </Box>
      </Container>
    </>
  );
};

export default ExamFormDetailEdit;
