import { useEffect, useState } from "react";
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
import { RegistrationForm } from "../../model";
import { useApproveReg } from "../../hooks/request/useApprove";
import { useAuth } from "../../context/AuthProvider";
import AlertDialog from "../../components/modal/AlertDialog";

const RegisterFormDetail = () => {
  const [student, setStudent] = useState<RegistrationForm | undefined>();
  const [loading, setLoading] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState<
    "approve" | "disApprove" | undefined
  >(undefined);
  const handleOpenAlert = (alert: "approve" | "disApprove") => {
    console.log(alert);
    setAlertType(alert);
    setOpenAlert(true);
  };
  const handleCloseAlert = () => setOpenAlert(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const { auth } = useAuth();
  const roles = auth.roles.toString();
  const { getApproveReg, success, loadingRegApprove } = useApproveReg();
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

  //handle approve and disApprove trigger in modal
  const handleApprove = () => {
    getApproveReg(id, { status: true }, approveLink);
  };
  const handleDisApprove = () => {
    getApproveReg(id, { status: false }, approveLink);
  };

  if (loading || loadingRegApprove) {
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
            onClick={() => handleOpenAlert("approve")}
            disabled={student?.checked !== null || success ? true : false}
          >
            تایید کردن
          </Button>
          <Button
            variant="contained"
            onClick={() => handleOpenAlert("disApprove")}
            disabled={student?.checked !== null || success ? true : false}
          >
            رد کردن
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
      <AlertDialog
        handleCloseAlert={handleCloseAlert}
        openAlert={openAlert}
        firstName={student?.firstName}
        family={student?.family}
        alertType={alertType}
        handleApprove={
          alertType === "approve" ? handleApprove : handleDisApprove
        }
        alertPage="پذیرش"
      />
    </>
  );
};

export default RegisterFormDetail;
