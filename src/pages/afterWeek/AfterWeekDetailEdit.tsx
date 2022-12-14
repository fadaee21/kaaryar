import React, { useEffect, useState } from "react";
import { editAxios, getData } from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress";
import { AfterWeekType, BeforeWeekType } from "../../model";
import { Box, Button, Container, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InitialDataRegistered from "../../components/beforeWeek/InitialDataRegistered";
import AfterWeekDetailEditComp from "../../components/afterWeek/AfterWeekDetailEditComp";

const AfterWeekDetailEdit = () => {
  const [student, setStudent] = useState<AfterWeekType | null>(null);
  const [loadingGet, setLoadingGet] = useState(true);
  const [loadingPut, setLoadingPut] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const studentIdAfterWeek = `/exam/after/week/form/${id}`;

  const getStudent = async () => {
    setLoadingGet(true);
    try {
      let response = await getData(studentIdAfterWeek);
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
  // console.log(student)

  const handleClick = async (e: React.FormEvent) => {
    setLoadingPut(true);
    e.preventDefault();
    try {
      const response = await editAxios(studentIdAfterWeek, {
        data: student,
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
  
  const handleChangeBefore = (e: any) => {
    const { name, value } = e.target;
    setStudent((prev: any) => ({
      ...prev,
      beforeWeekForm: { ...prev.beforeWeekForm, [name]: value },
    }));
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
          ????????????
        </Button>
      </Box>
      <Container maxWidth="lg">
        <InitialDataRegistered
          student={student?.beforeWeekForm as BeforeWeekType | null}
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
              ?????????? ??????????????
            </Button>
          </Box>
          <AfterWeekDetailEditComp
            student={student}
            handleChange={handleChange}
            handleChangeBefore={handleChangeBefore}
          />
        </Box>
      </Container>
    </>
  );
};

export default AfterWeekDetailEdit;
