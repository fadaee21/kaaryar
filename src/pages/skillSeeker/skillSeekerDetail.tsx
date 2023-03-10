import { Box, Button, Container, Divider, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getData } from "../../api/axios";
import LoadingProgress from "../../components/LoadingProgress";
import { AfterWeekType, BeforeWeekType, RegistrationForm, SeekerStudent } from "../../model";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import BeforeWeekDetailShowComp from "../../components/beforeWeek/BeforeWeekDetailShowComp";
import AfterWeekDetailShowComp from "../../components/afterWeek/AfterWeekDetailShowComp";
import RegisterFormDetailComp from "../../components/RegisterFormDetail/RegisterFormDetailComp";

const SkillSeekerDetail = () => {
  const [student, setStudent] = useState<SeekerStudent | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const studentSkillSeeker = `/status/form/${id}`;

  const getStudent = async () => {
    setLoading(true);
    try {
      let response = await getData(studentSkillSeeker);
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
  const matches = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));

  if (loading) {
    return <LoadingProgress />;
  }
  console.log(student?.afterWeekForm);
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
        <RegisterFormDetailComp student={student?.regForm as RegistrationForm} />
        <Divider />
        <BeforeWeekDetailShowComp
          typeComp="admission"
          student={student?.beforeWeekForm as BeforeWeekType | null}
          matches={matches}
          id={id}
        />
        <Divider />
        <AfterWeekDetailShowComp
          typeComp="admission"
          student={student?.afterWeekForm as AfterWeekType | null}
          matches={matches}
          id={id}
        />
      </Container>
    </>
  );
};

export default SkillSeekerDetail;
