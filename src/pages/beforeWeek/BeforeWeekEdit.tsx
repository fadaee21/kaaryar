import React, { useEffect, useState } from "react";
import { editAxios, getData } from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress";
import { BeforeWeekType, RegistrationForm } from "../../model";
import { Box, Button, Container, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BeforeWeekEditComp from "../../components/beforeWeek/BeforeWeekEditComp";
import RegisterFormDetailComp from "../../components/RegisterFormDetail/RegisterFormDetailComp";
// import ExamFormDetailEditComp2 from "../../components/ExamFormDetail/ExamFormDetailEditComp2";

const BeforeWeekDetailEdit = () => {
  const [student, setStudent] = useState<BeforeWeekType | null>(null);
  const [loadingGet, setLoadingGet] = useState(true);
  const [loadingPut, setLoadingPut] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const studentId = `/exam/before/week/form/${id}`;

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
      const response = await editAxios(studentId, {
        data: {
          form: student,
        },
      });
      if (response.status === 200) {
        navigate(-1);
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
    const { name, value } = e.target;
    setStudent((prev: any) => ({ ...prev, [name]: value }));
  };

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
        <RegisterFormDetailComp
          student={student?.registrationForm as RegistrationForm}
        />
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
          <BeforeWeekEditComp student={student} handleChange={handleChange} />
        </Box>
      </Container>
    </>
  );
};

export default BeforeWeekDetailEdit;
