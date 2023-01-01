import React, { useEffect, useState } from "react";
import { getData } from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  // useMediaQuery,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RegisterFormDetailComp from "../../components/RegisterFormDetail/RegisterFormDetailComp";
// import { useApproveReg } from "../../hooks/request/useApprove";
import { RegistrationForm } from "../../model";
import { useApprove } from "../../hooks/request/useApprove";
import { useAuth } from "../../context/AuthProvider";

const RegisterFormDetail = () => {
  const [student, setStudent] = useState<RegistrationForm | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const { auth } = useAuth();
  const roles = auth.roles.toString();
  // const { success, getApprove } = useApproveReg();
  const { getApprove, successObject, success } = useApprove();
  const studentId = `/reg/form/${id}`;
  const approveLink = "/reg/form/approve";
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
        <ButtonGroup
          variant="contained"
          color="secondary"
          size="small"
          aria-label="small button group"
        >
          <Button
            onClick={() => navigate(`/${roles}/register-form-edit/${id}`)}
          >
            ویرایش
          </Button>
          <Button
            variant="contained"
            onClick={() => getApprove(id, { checked: true }, approveLink)}
            disabled={
              student?.checked ||
              // successObject === "checked"
              success
                ? true
                : false
            }
          >
            تایید
          </Button>
          <Button
            variant="contained"
            onClick={() => getApprove(id, { checked: false }, approveLink)}
            disabled={
              student?.checked ||
              // successObject === "checked"
              success
                ? true
                : false
            }
          >
            عدم تایید
          </Button>
          <Button endIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
            بازگشت
          </Button>
        </ButtonGroup>
      </Box>
      <Container maxWidth="lg">
        <RegisterFormDetailComp student={student} />
        <Divider />
      </Container>
    </>
  );
};

export default RegisterFormDetail;
