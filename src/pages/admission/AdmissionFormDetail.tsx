import { useEffect, useState } from "react";
import { getData } from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress";
import { ExamRegisterUser } from "../../model";
import { Box, Button, Container, Divider, useMediaQuery } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExamFormDetailComp from "../../components/ExamFormDetail/ExamFormDetailComp";
import ExamFormDetailShowComp1 from "../../components/ExamFormDetail/ExamFormDetailShowComp1";
import ExamFormDetailShowComp2 from "../../components/ExamFormDetail/ExamFormDetailShowComp2";

const AdmissionFormDetail = () => {
  const [student, setStudent] = useState<ExamRegisterUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

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

  useEffect(() => {
    getStudent();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);
  const matches = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));

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
        <ExamFormDetailShowComp1
          typeComp="admission"
          student={student}
          matches={matches}
          id={id}
        />
        <Divider />
        <ExamFormDetailShowComp2
          typeComp="admission"
          student={student}
          matches={matches}
          id={id}
        />
      </Container>
    </>
  );
};

export default AdmissionFormDetail;
